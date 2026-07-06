import { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { theme } from '~/constants/theme';

type WaveformVisualizerProps = {
  active?: boolean;
  barCount?: number;
  height?: number;
  compact?: boolean;
};

export function WaveformVisualizer({
  active = false,
  barCount = 34,
  height = 56,
  compact = false,
}: WaveformVisualizerProps) {
  const bars = useMemo(
    () =>
      Array.from({ length: barCount }, (_, index) => ({
        value: new Animated.Value(0.28 + ((index * 7) % 10) / 18),
        seed: index,
      })),
    [barCount]
  );
  const loops = useRef<Animated.CompositeAnimation[]>([]);

  useEffect(() => {
    loops.current.forEach((loop) => loop.stop());
    loops.current = [];

    if (!active) {
      bars.forEach(({ value, seed }) => {
        value.setValue(0.22 + ((seed * 5) % 9) / 24);
      });
      return;
    }

    loops.current = bars.map(({ value, seed }) => {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: 0.35 + ((seed * 3) % 11) / 13,
            duration: 220 + (seed % 6) * 45,
            useNativeDriver: false,
          }),
          Animated.timing(value, {
            toValue: 0.18 + ((seed * 5) % 8) / 18,
            duration: 240 + (seed % 5) * 55,
            useNativeDriver: false,
          }),
        ])
      );
      loop.start();
      return loop;
    });

    return () => {
      loops.current.forEach((loop) => loop.stop());
      loops.current = [];
    };
  }, [active, bars]);

  return (
    <View style={[styles.container, { height }, compact && styles.compactContainer]}>
      {bars.map(({ value }, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bar,
            {
              height: value.interpolate({
                inputRange: [0, 1],
                outputRange: [6, Math.max(16, height - 8)],
              }),
              opacity: active ? 0.75 : 0.32,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    width: '100%',
  },
  compactContainer: {
    gap: 3,
  },
  bar: {
    backgroundColor: theme.colors.primary,
    borderRadius: 999,
    width: 5,
  },
});
