import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const strokeWidth = 10;
const progress = 0.5;
const image = require('~/assets/images/fm-noronha-cover-art.png');

export const RadioTopScreen = () => {
  const { width } = useWindowDimensions();
  const size = Math.min(width * 0.62, 250);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const angle = 2.2 * Math.PI * progress - Math.PI / 2;
  const indicatorX = size / 2 + radius * Math.cos(angle);
  const indicatorY = size / 2 + radius * Math.sin(angle);
  const imageSize = size * 0.8;

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Svg width={size} height={size}>
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#2D5770" stopOpacity="1" />
              <Stop offset="50%" stopColor="#879179" stopOpacity="1" />
              <Stop offset="100%" stopColor="#dff7e8" stopOpacity="1" />
            </LinearGradient>
          </Defs>

          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#f1f8f4"
            strokeWidth={strokeWidth}
            fill="none"
          />

          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#grad)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            transform={`rotate(-70 ${size / 2} ${size / 2})`}
          />

          <Circle
            cx={indicatorX}
            cy={indicatorY}
            r={8}
            fill="white"
            stroke="#2D5770"
            strokeWidth={5}
          />
        </Svg>

        <View
          style={[
            styles.imageContainer,
            {
              width: imageSize,
              height: imageSize,
              borderRadius: imageSize / 2,
            },
          ]}>
          <Image source={image} style={styles.image} resizeMode="cover" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 72,
    paddingBottom: 24,
  },

  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  imageContainer: {
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
  },
});
