import { Text, View, Image, StyleSheet, ImageSourcePropType } from 'react-native';

import { theme } from '~/constants/theme';

type ScreenContentProps = {
  title: string;
  text: string;
  imageSource: ImageSourcePropType;
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
      <Text selectable style={styles.title}>
        {title}
      </Text>
      <Text selectable style={styles.text}>
        {text}
      </Text>

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
    gap: theme.spacing.sm,
    zIndex: 1,
  },
  image: {
    width: 200,
    height: 140,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: theme.colors.white,
    textAlign: 'center',
    width: '90%',
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 28,
    color: theme.colors.white,
    textAlign: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: theme.colors.onSurface,
    textAlign: 'center',
    width: '90%',
    lineHeight: 26,
  },
});
