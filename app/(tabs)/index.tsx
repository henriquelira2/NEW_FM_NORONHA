import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { LiveBadge } from '~/components/LiveBadge';
import { theme } from '~/constants/theme';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();
  const compact = height < 760;
  const logoWidth = clamp(width * 0.58, 190, compact ? 250 : 290);
  const featureHeight = clamp(height * 0.21, 118, compact ? 145 : 175);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Stack.Screen
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <SafeAreaView edges={['bottom']} style={styles.container}>
        <ImageBackground
          source={require('~/assets/images/noronha-sea-turtle-vertical.jpg')}
          resizeMode="cover"
          style={styles.background}>
          <View style={styles.overlay} />

          <View
            style={[
              styles.content,
              {
                gap: compact ? 14 : 20,
                paddingBottom: Math.max(insets.bottom + 18, 28),
                paddingTop: Math.max(insets.top + 28, 54),
              },
            ]}>
            <LiveBadge compact label=" FM NORONHA" dotColor={theme.colors.cyanNeon} />

            <View style={styles.heroBlock}>
              <Image
                source={require('~/assets/images/sistema-golfinho-logo.png')}
                resizeMode="contain"
                style={[styles.logo, { width: logoWidth }]}
              />
              <Text selectable style={[styles.title, compact && styles.compactTitle]}>
                O som do paraíso
              </Text>
              <Text selectable style={[styles.subtitle, compact && styles.compactSubtitle]}>
                Ao vivo de Fernando de Noronha, com música, informação e a energia da ilha.
              </Text>
            </View>

            <ImageBackground
              source={require('~/assets/images/noronha-underwater-vertical.jpg')}
              resizeMode="cover"
              style={[styles.featureCard, { height: featureHeight }]}
              imageStyle={styles.featureImage}>
              <View style={styles.featureOverlay} />
              <View style={styles.featureIcon}>
                <Ionicons name="radio" size={22} color={theme.colors.primary} />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureLabel}>SINTONIA DA ILHA</Text>
                <Text selectable style={styles.featureTitle}>
                  96.9 FM • FM Noronha
                </Text>
              </View>
            </ImageBackground>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/sound')}>
              <Ionicons name="play" size={20} color={theme.colors.white} />
              <Text style={styles.buttonText}>Ouvir agora</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(3, 8, 11, 0.66)',
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  heroBlock: {
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  logo: {
    height: 112,
  },
  title: {
    color: theme.colors.white,
    fontSize: 36,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  compactTitle: {
    fontSize: 31,
  },
  subtitle: {
    color: theme.colors.onSurface,
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 24,
    maxWidth: 330,
    textAlign: 'center',
  },
  compactSubtitle: {
    fontSize: 15,
    lineHeight: 21,
  },
  featureCard: {
    borderColor: theme.colors.outlineMuted,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    justifyContent: 'flex-end',
    maxWidth: 430,
    overflow: 'hidden',
    padding: 16,
    width: '100%',
  },
  featureImage: {
    opacity: 0.58,
  },
  featureOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(14, 21, 19, 0.5)',
  },
  featureIcon: {
    alignItems: 'center',
    backgroundColor: theme.colors.glass,
    borderColor: theme.colors.outlineMuted,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    height: 42,
    justifyContent: 'center',
    marginBottom: 10,
    width: 42,
  },
  featureText: {
    gap: 3,
  },
  featureLabel: {
    color: theme.colors.secondary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
  },
  featureTitle: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: '800',
  },
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primaryContainer,
    borderRadius: theme.radius.full,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    maxWidth: 280,
    paddingHorizontal: 28,
    paddingVertical: 14,
    width: '100%',
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '900',
  },
});
