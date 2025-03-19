import { Stack, useRouter } from 'expo-router';
import { StyleSheet, View, Button } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';
export default function Sound() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerTransparent: true,
          headerStyle: { backgroundColor: 'rgba(0, 0, 0, 0)' },
          headerTintColor: '#fff',
        }}
      />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/two.tsx" title="Tab Two" />
        <Button title="Ir para Tab Home" onPress={() => router.push('/(tabs)')} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
