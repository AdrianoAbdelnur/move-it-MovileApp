import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Directions = ({ directions }) => {
  return (
    <View style={styles.directionsContainer}>
      <FlatList
        data={directions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.directionItem}>
            {index === 0 ? (
              <Text
                style={[
                  styles.directionText,
                  { textDecorationLine: "underline" },
                ]}
              >
                From:
              </Text>
            ) : index === directions.length - 1 ? (
              <Text
                style={[
                  styles.directionText,
                  { textDecorationLine: "underline" },
                ]}
              >
                End of route:
              </Text>
            ) : (
              <Text
                style={[
                  styles.directionText,
                  { textDecorationLine: "underline" },
                ]}
              >
                to:
              </Text>
            )}
            <Text style={styles.directionText}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  directionsContainer: {
    position: "absolute",
    top: 5,
    width: "95%",
    maxHeight: "18%",
    backgroundColor: "rgba(180, 180, 180, 0.7)",
    padding: 3,
    borderRadius: 8,
    alignSelf: "center",
    zIndex: 1,
  },
  directionItem: {
    paddingVertical: 1,
  },
  directionText: {
    fontSize: 10,
  },
});

export default Directions;
