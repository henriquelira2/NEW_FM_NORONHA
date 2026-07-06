import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { LiveBadge } from '~/components/LiveBadge';
import { theme } from '~/constants/theme';

export function TuningLoading() {
  const progress = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    const progressLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(glow, {
          toValue: 0.45,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );

    progressLoop.start();
    glowLoop.start();

    return () => {
      progressLoop.stop();
      glowLoop.stop();
    };
  }, [glow, progress]);

  return (
    <View style={styles.container}>
      <View style={styles.topStatus}>
        <LiveBadge label="LIVE FROM THE ISLAND" />
      </View>

      <View style={styles.content}>
        <Text style={styles.eyebrow}> FM NORONHA</Text>
        <Animated.Text selectable style={[styles.title, { opacity: glow }]}>
          SINTONIZANDO NORONHA...
        </Animated.Text>
        <View style={styles.progressTrack}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                transform: [
                  {
                    translateX: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-140, 280],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <MaterialIcons name="waves" size={28} color={theme.colors.cyanNeon} />
            <View>
              <Text style={styles.infoLabel}>MAR</Text>
              <Text style={styles.infoValue}>27°C / Calmo</Text>
            </View>
          </View>
          <View style={styles.infoCard}>
            <MaterialIcons name="wb-sunny" size={28} color={theme.colors.cyanNeon} />
            <View>
              <Text style={styles.infoLabel}>CLIMA</Text>
              <Text style={styles.infoValue}>Sol Radiante</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.footer}>96.9 FM • O SOM DO PARAÍSO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: '#000000',
    justifyContent: 'center',
    padding: theme.spacing.edge,
    zIndex: 20,
  },
  topStatus: {
    left: theme.spacing.edge,
    position: 'absolute',
    top: theme.spacing.lg,
  },
  content: {
    alignItems: 'center',
    gap: theme.spacing.sm,
    maxWidth: 520,
    width: '100%',
  },
  eyebrow: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 5,
  },
  title: {
    color: theme.colors.cyanNeon,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 4,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 255, 255, 0.75)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  progressTrack: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 999,
    height: 3,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.xs,
    overflow: 'hidden',
    width: 180,
  },
  progressBar: {
    backgroundColor: theme.colors.cyanNeon,
    borderRadius: 999,
    height: '100%',
    width: 70,
  },
  infoRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    justifyContent: 'center',
    width: '100%',
  },
  infoCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    gap: theme.spacing.xs,
    maxWidth: 190,
    padding: theme.spacing.sm,
  },
  infoLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  infoValue: {
    color: theme.colors.onSurface,
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    bottom: theme.spacing.edge,
    color: 'rgba(255,255,255,0.22)',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    position: 'absolute',
    right: theme.spacing.edge,
  },
});
