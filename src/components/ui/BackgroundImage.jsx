import React from "react";
import { Image, StyleSheet } from "react-native";

export const BackgroundImage = ({ customStyle }) => {
  return (
    <Image
      source={require("./../../assetsApp/callacar.jpeg")}
      style={[styles.image, customStyle]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: undefined,
    aspectRatio: 0.855,
    opacity: 0.1,
  },
});
