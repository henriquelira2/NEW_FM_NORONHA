import { Text, View, Image, StyleSheet } from 'react-native';

type ScreenContentProps = {
  title: string;
  text: string;

  imageSource: any;
  children?: React.ReactNode;
};

export const ScreenContent = ({
  title,
  text,

  imageSource,
  children,
}: ScreenContentProps) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    width: 200,
    height: 140,
    bottom: '22%',
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    bottom: '15%',
    width: '90%',
  },
  subtitle: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    bottom: '15%',
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    bottom: '15%',
    width: '90%',
  },
});
