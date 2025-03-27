/* eslint-disable prettier/prettier */
import { View, Image, StyleSheet } from 'react-native';

type ScreenContentProps = {
  imageSource: any;
};

export const HomeIcon = ({ imageSource }: ScreenContentProps) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  image: {
    width: 100,
    height: 100,
  },
});
