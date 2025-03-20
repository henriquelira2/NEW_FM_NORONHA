import { Stack, useRouter } from 'expo-router';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';

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
          {/*<Button title="Ir para Tab Home" onPress={() => router.push('/(tabs)')} />*/}
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems: 'center',
  },
});
