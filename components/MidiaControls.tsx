/* eslint-disable prettier/prettier */
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { useMedia } from './MediaProvider';

const MediaControls: React.FC = () => {
  const { play, pause } = useMedia();
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.nowPlaying} />
        <Text style={styles.live}>🔴 LIVE</Text>
      </View>
      <Text style={styles.songTitle}>Pensando em voz alta  </Text>
      
      <View style={styles.controls}>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="heart-o" size={24} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="list" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop:70,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  nowPlaying: {
    fontSize: 12,
    color: '#888',
  },
  live: {
    fontSize: 12,
    color: '#3067ff',
    fontWeight: 'bold',
  },
  songTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 50,
  },
  iconButton: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 50,
  },
  playButton: {
    backgroundColor: '#5a9cff',
    padding: 20,
    borderRadius: 50,
  },
});

export default MediaControls;
