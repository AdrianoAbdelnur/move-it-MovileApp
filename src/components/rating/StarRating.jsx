import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Star from "./../ui/Star";
import colors from "../../styles/colors";

const StarRating = ({
  maxStars = 5,
  rating,
  changeRating = () => {},
  name,
}) => {
  const handlePress = (starIndex) => {
    changeRating(starIndex + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {Array.from({ length: maxStars }, (_, index) => (
          <Star
            key={index}
            filled={index < rating}
            onPress={() => handlePress(index)}
          />
        ))}
      </View>
      <Text style={styles.ratingText}>
        {name}´s rating: {rating}/{maxStars}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  starsContainer: {
    flexDirection: "row",
  },
  ratingText: {
    marginBottom: 20,
    fontSize: 18,
    color: "white",
  },
});

export default StarRating;
