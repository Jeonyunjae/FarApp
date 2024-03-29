import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function SwipeContainer({
  useLine = true,
  containerStyle,
  translateY = 300,
  overValue = 50,

  topComponent,
  topComponentStyle,

  children,
  bottomComponentStyle,

  limitTopValue = 50,
  limitBottomValue = 250,
}: any) {
  // Define default useSharedValue
  const start = useSharedValue(0);
  const position = useSharedValue(translateY);
  const height = useSharedValue(translateY + overValue);

  // Get height of container
  const [viewHeight, setViewHeight] = React.useState(0);

  // Get height of window phone
  const screenHeight = Dimensions.get("window").height;

  // Make gesture function
  const gesture = useAnimatedGestureHandler({
    onStart: (event: any, context: any) => {
      context.translateY = position.value;
    },
    onActive: (event: any, context: any) => {
      position.value = event.translationY + context.translateY;
      if (position.value + viewHeight <= screenHeight) {
        position.value = screenHeight - viewHeight;
      }
      height.value = position.value + overValue;
    },
    onEnd: () => {
      if (start.value == 0) {
        if (position.value > limitTopValue) {
          position.value = withSpring(translateY);
          height.value = withSpring(translateY + overValue);
          start.value = translateY;
        } else if (position.value < limitTopValue && position.value > 0) {
          position.value = withSpring(0);
          height.value = withSpring(overValue);
        }
      } else {
        if (position.value < limitBottomValue) {
          position.value = withSpring(0);
          height.value = withSpring(overValue);
          start.value = 0;
        } else {
          height.value = withSpring(translateY + overValue);
          position.value = withSpring(translateY);
        }
      }
    },
  });

  //Animated style for bottom component
  const animatedBottom = useAnimatedStyle(() => ({
    top: position.value,
  }));

  //Animated style for top component
  const animatedTop = useAnimatedStyle(() => ({
    height: height.value,
  }));
  return (
    <View style={containerStyle ? containerStyle : style.container}>
      <Animated.View
        style={[
          topComponentStyle ? topComponentStyle : style.topStyle,
          animatedTop,
        ]}
      >
        {topComponent}
      </Animated.View>
      <PanGestureHandler onGestureEvent={gesture}>
        <Animated.View
          onLayout={(event: any) => {
            const { height } = event.nativeEvent.layout;
            setViewHeight(height);
          }}
          style={[
            bottomComponentStyle ? bottomComponentStyle : style.bottomStyle,
            animatedBottom,
          ]}
        >
          {useLine && (
            <View style={style.lineContainer}>
              <View style={style.line}></View>
            </View>
          )}
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  topStyle: {
    width: "100%",
  },
  bottomStyle: {
    position: "absolute",
    width: "100%",
    height: 800,
    backgroundColor: "#fff",
  },
  lineContainer: {
    height: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    width: 50,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#000",
  },
});
