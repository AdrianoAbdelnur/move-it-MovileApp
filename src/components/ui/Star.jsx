import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Star = ({ filled, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={filled ? styles.filledStar : styles.emptyStar}>★</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filledStar: {
    fontSize: 30,
    color: "gold",
  },
  emptyStar: {
    fontSize: 30,
    color: "gray",
  },
});

export default Star;
