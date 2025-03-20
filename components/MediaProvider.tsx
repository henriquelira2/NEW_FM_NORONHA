/* eslint-disable prettier/prettier */
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { createContext, useContext, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

const MediaContext = createContext<{ play: () => void; pause: () => void } | null>(null);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  return (
    <MediaContext.Provider value={{ play, pause }}>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
    color: '#ffffff',
  },
});
