/* eslint-disable prettier/prettier */
import { useFocusEffect } from '@react-navigation/native';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import TrackPlayer, { Capability, State, Event } from 'react-native-track-player';

const MediaContext = createContext<{ play: () => void; pause: () => void; isPlaying: boolean } | null>(null);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [radioStatus, setRadioStatus] = useState('96.9');

  useFocusEffect(
    useCallback(() => {
      const checkPlaybackState = async () => {
        const playbackState = await TrackPlayer.getPlaybackState();
        setIsPlaying(playbackState.state === State.Playing);
      };

      checkPlaybackState();

      const listener = TrackPlayer.addEventListener(Event.PlaybackState, checkPlaybackState);

      return () => {
        listener.remove();
      };
    }, [])
  );

  useEffect(() => {
    async function setupPlayer() {
      try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
          stoppingAppPausesPlayback: false,
          capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
          compactCapabilities: [Capability.Play, Capability.Pause],
        });

        const streamUrl = process.env.STREAM_URL || 'https://default-stream-url.com';
        const response = await fetch(streamUrl, { method: 'HEAD' });

        if (!response.ok) {
          throw new Error('Falha ao acessar o stream');
        }

        await TrackPlayer.add({
          id: '1',
          url: streamUrl,
          title: 'FM Noronha',
          artist: 'Noronha Radio',
          artwork: 'https://img.radios.com.br/radio/lg/radio217106_1684426096.jpg',
        });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setRadioStatus('Não foi possível conectar à rádio no momento. Isso pode ser devido a problemas na conexão com a internet ou a uma instabilidade temporária no servidor. Tente novamente mais tarde.');
      }
    }

    setupPlayer();

    const onPlaybackStateChange = (playbackState: { state: State }) => {
      setIsPlaying(playbackState.state === State.Playing);
    };

    const listener = TrackPlayer.addEventListener(Event.PlaybackState, onPlaybackStateChange);

    return () => {
      listener.remove();
      TrackPlayer.pause();
    };
  }, []);

  const play = async () => {
    await TrackPlayer.play();
    setIsPlaying(true);
  };

  const pause = async () => {
    await TrackPlayer.pause();
    setIsPlaying(false);
  };

  return (
    <MediaContext.Provider value={{ play, pause, isPlaying }}>
      <View style={styles.container}>
        <Image
          source={
            isPlaying
              ? require('~/assets/images/videoplayback.gif')
              : require('~/assets/images/videoframe_12409.png')
          }
          style={styles.gif}
        />

        <View style={styles.controls}>
          <Text style={styles.frequency}>{radioStatus}</Text>
        </View>
      </View>
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia deve ser usado dentro de um MediaProvider');
  }
  return context;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
  },
  gif: {
    width: 500,
    height: 100,
  },
  controls: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    width: 340,
  },
  button: {
    padding: 10,
    borderRadius: 30,
    borderColor: '#ffffff',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 24,
  },
  frequency: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    color: '#ffffff',
    textAlign: 'center',
    width: 350,
    height: 150,
  },
});
