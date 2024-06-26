import React from "react";
import { StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView from "react-native-maps";

export const Maps = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -34.92588637283261,
          longitude: 138.59506596659415,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        }}
      />
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          style={styles.input}
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: "AIzaSyDWAdSPRMoQxd-DIP__MbHPj2RvthFhBVE",
            language: "en",
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    flex: 1,
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
});
