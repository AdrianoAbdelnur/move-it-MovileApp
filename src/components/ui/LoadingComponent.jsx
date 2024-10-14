import React from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import globalStyles from "../../styles/globalStyles";

export const LoadingComponent = () => {
  return (
    <View style={globalStyles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assetsApp/CallacarLogo.png")}
          style={styles.image}
        />
        <ActivityIndicator
          size={"large"}
          color={"white"}
          style={styles.activityIndicator}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 300,
  },
  activityIndicator: {
    position: "absolute",
  },
});
