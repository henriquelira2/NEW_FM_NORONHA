import { useCallback, useEffect, useMemo, useState } from 'react';
import TrackPlayer, { Capability, Event, State } from 'react-native-track-player';

import {
  RADIO_CONNECTION_ERROR,
  RADIO_NOTIFICATION_ARTWORK_URI,
  RADIO_STREAM_URL,
  RADIO_TRACK,
} from '~/constants/radio';

let setupPromise: Promise<void> | null = null;

async function checkStreamAvailability() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(RADIO_STREAM_URL, {
      method: 'HEAD',
      signal: controller.signal,
    });

    if (!response.ok && response.status !== 405) {
      throw new Error(`Stream unavailable: ${response.status}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}

function isPlayerAlreadyInitialized(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'player_already_initialized'
  );
}

async function syncRadioMetadata() {
  await TrackPlayer.updateNowPlayingMetadata({
    title: RADIO_TRACK.title,
    artist: RADIO_TRACK.artist,
    artwork: RADIO_NOTIFICATION_ARTWORK_URI,
  });
}

async function ensureRadioPlayer() {
  if (!setupPromise) {
    setupPromise = (async () => {
      try {
        await TrackPlayer.setupPlayer();
      } catch (error) {
        if (!isPlayerAlreadyInitialized(error)) {
          throw error;
        }
      }

      await TrackPlayer.updateOptions({
        stoppingAppPausesPlayback: false,
        capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
        compactCapabilities: [Capability.Play, Capability.Pause],
      });

      await checkStreamAvailability();
      await TrackPlayer.load(RADIO_TRACK);
      await syncRadioMetadata();
    })().catch((error) => {
      setupPromise = null;
      throw error;
    });
  }

  return setupPromise;
}

export function useRadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const syncPlaybackState = async () => {
      try {
        const playbackState = await TrackPlayer.getPlaybackState();

        if (isMounted) {
          setIsPlaying(playbackState.state === State.Playing);
        }
      } catch {
        if (isMounted) {
          setIsPlaying(false);
        }
      }
    };

    ensureRadioPlayer()
      .then(() => {
        if (isMounted) {
          setStatusMessage(null);
          setIsReady(true);
        }

        return syncPlaybackState();
      })
      .catch(() => {
        if (isMounted) {
          setStatusMessage(RADIO_CONNECTION_ERROR);
          setIsReady(false);
          setIsPlaying(false);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    const listener = TrackPlayer.addEventListener(Event.PlaybackState, ({ state }) => {
      if (isMounted) {
        setIsPlaying(state === State.Playing);
      }
    });

    return () => {
      isMounted = false;
      listener.remove();
    };
  }, []);

  const play = useCallback(async () => {
    setIsLoading(true);

    try {
      await ensureRadioPlayer();
      await syncRadioMetadata();
      await TrackPlayer.play();
      setStatusMessage(null);
      setIsReady(true);
      setIsPlaying(true);
    } catch {
      setStatusMessage(RADIO_CONNECTION_ERROR);
      setIsReady(false);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const pause = useCallback(async () => {
    try {
      await TrackPlayer.pause();
      setIsPlaying(false);
    } catch {
      setStatusMessage(RADIO_CONNECTION_ERROR);
    }
  }, []);

  return useMemo(
    () => ({
      isPlaying,
      isLoading,
      isReady,
      statusMessage,
      play,
      pause,
    }),
    [isLoading, isPlaying, isReady, pause, play, statusMessage]
  );
}
