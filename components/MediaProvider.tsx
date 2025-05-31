/* eslint-disable prettier/prettier */
import { useFocusEffect } from '@react-navigation/native';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { View, Image, StyleSheet, Text, Dimensions } from 'react-native';
import TrackPlayer, { Capability, State, Event } from 'react-native-track-player';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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

        const streamUrl = 'https://stm1.xcast.com.br:12212/stream';
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
        <View style={styles.radio}>
          {radioStatus === '96.9' && <Text style={styles.icon}  ><MaterialIcons name="music-note" size={24} color="white" /></Text>}
          <Text style={styles.frequency} >{radioStatus}</Text>
          {radioStatus === '96.9' && <Text style={styles.icon} ><MaterialIcons name="music-note" size={24} color="white" /></Text>}

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
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    marginTop: 50,
  },
  gif: {
    width: 500,
    height: 100,
    marginBottom: 50,
  },
  radio: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    height: height * 0.1,
  },

  icon: {
    fontSize: 30,
    justifyContent: 'flex-start',
    height: height * 0.2 ,
  },
  frequency: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    height: height * 0.2,
  },
});
