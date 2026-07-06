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
    const configureNavigationBar = async () => {
      try {
        await NavigationBar.setVisibilityAsync('hidden');
        await NavigationBar.setBackgroundColorAsync('rgba(0,0,0,0)');
        await NavigationBar.setBehaviorAsync('overlay-swipe');
        await NavigationBar.setButtonStyleAsync('light');
      } catch {
        // Navigation bar APIs are platform-specific and can fail harmlessly on unsupported targets.
      }
    };

    configureNavigationBar().catch(() => undefined);
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ headerShown: false }} />
    </Stack>
  );
}
