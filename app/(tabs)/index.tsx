/* eslint-disable prettier/prettier */
import { Stack, useRouter } from 'expo-router';
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  const router = useRouter();
  const image = require('../../assets/images/background.png');

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent />
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
          <ScreenContent
            title="FM Noronha"
            text="Curta o melhor da rádio de Fernando de Noronha, onde quer que esteja !"
            imageSource={require('../../assets/images/LogoGolfinho.png')}
          />

          <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/sound')}>
            <Text style={styles.buttonText}>Vamos Começar</Text>
          </TouchableOpacity>

          <View style={styles.spacer} />
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0010eadd',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: 200,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  spacer: {
    marginBottom: 60,
  },
});
