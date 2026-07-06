import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { LiveBadge } from '~/components/LiveBadge';
import { MediaProvider, useMedia } from '~/components/MediaProvider';
import MediaControls from '~/components/MidiaControls';
import RadioHeader from '~/components/RadioHeader';
import { TuningLoading } from '~/components/TuningLoading';
import { WaveformVisualizer } from '~/components/WaveformVisualizer';
import { RADIO_FREQUENCY } from '~/constants/radio';
import { theme } from '~/constants/theme';
import {
  getTransmissionColor,
  getTransmissionLabel,
  getTransmissionStatus,
} from '~/constants/transmission';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function SoundContent() {
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { isPlaying, isLoading, isReady, statusMessage } = useMedia();
  const compact = height < 780;
  const veryCompact = height < 700;
  const status = getTransmissionStatus({
    isLoading,
    isOffline: Boolean(statusMessage),
  });
  const statusLabel = getTransmissionLabel(status);
  const statusColor = getTransmissionColor(status);
  const coverSize = clamp(
    Math.min(width * 0.58, height * 0.29),
    veryCompact ? 170 : 190,
    compact ? 238 : 260
  );
  const topOffset = Math.max(insets.top + 48, 62);
  const waveformHeight = veryCompact ? 34 : compact ? 40 : 46;

  return (
    <ImageBackground
      source={require('~/assets/images/noronha-dois-irmaos-hero.jpg')}
      resizeMode="cover"
      style={styles.image}>
      <View style={styles.overlay} />
      <RadioHeader />

      <View
        style={[
          styles.content,
          {
            gap: veryCompact ? 8 : 12,
            paddingBottom: Math.max(insets.bottom + 8, 16),
            paddingTop: topOffset,
          },
        ]}>
        <LiveBadge compact label={statusLabel} dotColor={statusColor} />

        <View style={[styles.coverWrap, { height: coverSize, width: coverSize }]}>
          <View style={styles.coverGlow} />
          <View style={styles.coverPanel}>
            <Image
              source={require('~/assets/images/fm-noronha-cover-art.png')}
              resizeMode="cover"
              style={styles.coverImage}
            />
          </View>
        </View>

        <View style={styles.titleBlock}>
          <Text selectable style={[styles.title, compact && styles.compactTitle]}>
            Rádio Ao Vivo
          </Text>
          <Text selectable style={[styles.subtitle, compact && styles.compactSubtitle]}>
            FM Noronha
          </Text>
        </View>

        <View style={[styles.nowPlayingCard, compact && styles.compactNowPlayingCard]}>
          <MaterialIcons name="radio" size={compact ? 26 : 30} color={theme.colors.primary} />
          <View style={styles.nowPlayingText}>
            <Text style={styles.nowPlayingLabel}>
              {status === 'recorded' ? 'CONTEÚDO' : 'NO AR AGORA'}
            </Text>
            <Text
              selectable
              style={[styles.nowPlayingTitle, compact && styles.compactNowPlayingTitle]}>
              {statusMessage
                ? 'Tentando reconectar'
                : `${RADIO_FREQUENCY} FM • ${statusLabel.toLowerCase()}`}
            </Text>
          </View>
        </View>

        <WaveformVisualizer
          active={isPlaying || isLoading}
          barCount={compact ? 30 : 34}
          compact={compact}
          height={waveformHeight}
        />

        <MediaControls compact={compact} />
      </View>

      {(isLoading || (!isReady && !statusMessage)) && <TuningLoading />}
    </ImageBackground>
  );
}

export default function Sound() {
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
        <MediaProvider>
          <SoundContent />
        </MediaProvider>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  image: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(3, 8, 11, 0.64)',
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  coverWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverGlow: {
    backgroundColor: 'rgba(169, 199, 255, 0.22)',
    borderRadius: theme.radius.xl,
    bottom: 12,
    left: 12,
    position: 'absolute',
    right: 12,
    top: 12,
  },
  coverPanel: {
    backgroundColor: theme.colors.glass,
    borderColor: theme.colors.outlineMuted,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  coverImage: {
    height: '100%',
    width: '100%',
  },
  titleBlock: {
    alignItems: 'center',
    gap: 2,
  },
  title: {
    color: theme.colors.white,
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  compactTitle: {
    fontSize: 26,
  },
  subtitle: {
    color: theme.colors.primary,
    fontSize: 19,
    fontWeight: '700',
    textAlign: 'center',
  },
  compactSubtitle: {
    fontSize: 16,
  },
  nowPlayingCard: {
    alignItems: 'center',
    backgroundColor: theme.colors.glass,
    borderColor: theme.colors.outlineMuted,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    maxWidth: 450,
    paddingHorizontal: 18,
    paddingVertical: 13,
    width: '100%',
  },
  compactNowPlayingCard: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  nowPlayingText: {
    flex: 1,
    gap: 1,
  },
  nowPlayingLabel: {
    color: theme.colors.outline,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
  },
  nowPlayingTitle: {
    color: theme.colors.onSurface,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  compactNowPlayingTitle: {
    fontSize: 14,
    lineHeight: 19,
  },
});
