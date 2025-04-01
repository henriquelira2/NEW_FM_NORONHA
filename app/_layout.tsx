/* eslint-disable prettier/prettier */
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import TrackPlayer from 'react-native-track-player';

import { playbackService } from '../service';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

TrackPlayer.registerPlaybackService(() => playbackService);

export default function RootLayout() {
  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBackgroundColorAsync('rgba(0,0,0,0)');
    NavigationBar.setBehaviorAsync('overlay-swipe');
    NavigationBar.setButtonStyleAsync('light');
  }, []);
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ headerShown: false }} />
    </Stack>
  );
}
