import React from "react";
import { ActivityIndicator, View } from "react-native";
import globalStyles from "../../styles/globalStyles";

export const LoadingComponent = () => {
  return (
    <View style={globalStyles.container}>
      <ActivityIndicator size={"large"} color={"red"} />
    </View>
  );
};
