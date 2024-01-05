import React from "react";
import AnimatedLottieView from "lottie-react-native";

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;
  return (
    <AnimatedLottieView
      autoPlay
      loop
      source={require("../animations/activityLoading.json")}
    />
  );
}

export default ActivityIndicator;
