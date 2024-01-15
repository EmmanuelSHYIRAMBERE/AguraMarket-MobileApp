import React from "react";
import AnimatedLottieView from "lottie-react-native";
import { View } from "react-native";

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;
  return (
    <View>
      <AnimatedLottieView
        autoPlay
        loop
        source={require("../animations/activityLoading.json")}
      />
    </View>
  );
}

export default ActivityIndicator;
