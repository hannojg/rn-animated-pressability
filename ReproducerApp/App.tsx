import {useEffect, useRef} from 'react';
import {Alert, Animated, Dimensions, Pressable, Text, View} from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function App() {
  const scale = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scale]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 26,
      }}>
      <Text>Try pressing on the blue box to show alert</Text>
      <AnimatedPressable
        style={{
          marginTop: 20,
          width: Dimensions.get('window').width,
          height: 250,
          backgroundColor: 'lightblue',
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{scale}],
        }}
        onPress={() => Alert.alert('Pressed!')}>
        <View style={{width: 50, height: 50, backgroundColor: 'red'}} />
      </AnimatedPressable>

      <Text
        style={{
          marginTop: 20,
          textAlign: 'center',
        }}>
        Pressing the red center will always trigger an onPress, while the rest
        of the box won't
      </Text>
    </View>
  );
}
