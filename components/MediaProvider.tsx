/* eslint-disable prettier/prettier */
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import TrackPlayer, { Capability, State, Event } from 'react-native-track-player';

const MediaContext = createContext<{
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
} | null>(null);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);

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
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        stoppingAppPausesPlayback: false,
        capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
        compactCapabilities: [Capability.Play, Capability.Pause],
      });

      const streamUrl = process.env.STREAM_URL || 'https://default-stream-url.com';
      await TrackPlayer.add({
        id: '1',
        url: streamUrl,
        title: 'FM Noronha',
        artist: 'Noronha Radio',
        artwork: 'https://img.radios.com.br/radio/lg/radio217106_1684426096.jpg',
      });
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
              ? require('~/assets/videoplayback.gif')
              : require('~/assets/videoframe_12409.png')
          }
          style={styles.gif}
        />

        <View style={styles.controls}>
          <TouchableOpacity style={styles.button}>
            <AntDesign name="stepbackward" size={18} color="white" />
          </TouchableOpacity>

          <Text style={styles.frequency}>96.9</Text>

          <TouchableOpacity style={styles.button}>
            <AntDesign name="stepforward" size={18} color="white" />
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
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
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 20,
    color: '#ffffff',
  },
});
