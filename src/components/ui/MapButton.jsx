import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

export const MapButton = ({ onPressFunction }) => {
  return (
    <TouchableOpacity
      onPress={onPressFunction}
      style={styles.mapButtonContainer}
    >
      <Image
        source={require("../../assetsApp/maps.png")}
        style={styles.image}
      />
      <Text>View in map</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapButtonContainer: {
    flexDirection: "row",
    margin: 10,
    padding: 8,
    backgroundColor: "grey",
    borderRadius: 12,
    alignSelf: "center",
  },
  image: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
});
