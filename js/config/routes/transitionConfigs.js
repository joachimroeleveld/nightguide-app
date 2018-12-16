import { Animated, Easing } from 'react-native';

export const fadeTransition = () => ({
  transitionSpec: {
    duration: 300,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: ({ position, scene }) => {
    const { index } = scene;

    const opacity = position.interpolate({
      inputRange: [index - 1, index],
      outputRange: [0, 1],
    });

    return { opacity };
  },
});
