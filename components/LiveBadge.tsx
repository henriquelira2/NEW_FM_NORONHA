import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { theme } from '~/constants/theme';

type LiveBadgeProps = {
  label?: string;
  dotColor?: string;
  compact?: boolean;
};

export function LiveBadge({
  label = 'LIVE',
  dotColor = theme.colors.live,
  compact = false,
}: LiveBadgeProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.35,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.45,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [opacity, scale]);

  return (
    <View style={styles.badge}>
      <Animated.View
        style={[styles.dot, { backgroundColor: dotColor, opacity, transform: [{ scale }] }]}
      />
      <Text style={[styles.label, compact && styles.compactLabel]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 16, 234, 0.22)',
    borderColor: 'rgba(190, 194, 255, 0.28)',
    borderRadius: theme.radius.full,
    borderWidth: 1,
    flexDirection: 'row',
    gap: theme.spacing.xs,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  dot: {
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  label: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
  },
  compactLabel: {
    fontSize: 10,
    letterSpacing: 1.4,
  },
});
