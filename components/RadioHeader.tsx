import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '~/constants/theme';

export default function RadioHeader() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 10) }]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color={theme.colors.primary} />
      </TouchableOpacity>
      <Text style={styles.title}> FM NORONHA</Text>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(14, 21, 19, 0.2)',
    borderBottomColor: theme.colors.outlineMuted,
    borderBottomWidth: 0,
    gap: 12,
    paddingBottom: 4,
    paddingHorizontal: 18,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: theme.colors.primary,
    flex: 1,
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: -1,
    textAlign: 'center',
  },
  spacer: {
    width: 44,
  },
});
