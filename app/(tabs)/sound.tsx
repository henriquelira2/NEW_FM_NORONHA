import { Stack, useRouter } from 'expo-router';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';

import { MediaProvider } from '~/components/MediaProvider';
import MediaControls from '~/components/MidiaControls';
import { RadioTopScreen } from '~/components/RadioTopScreen';

export default function Sound() {
  const router = useRouter();
  const image = require('../../assets/images/teste4.png');

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
      <SafeAreaView style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <RadioTopScreen />

          <MediaProvider>
            <MediaControls />
          </MediaProvider>

          {/*<Button title="Ir para Tab Home" onPress={() => router.push('/(tabs)')} />*/}
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
