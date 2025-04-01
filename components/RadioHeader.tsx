/* eslint-disable prettier/prettier */
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function RadioHeader() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>FM Noronha</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    position: 'absolute',
    left: 15,
  },
  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    width: 200,
    textAlign: 'left',
    left: 50,
  },
});
