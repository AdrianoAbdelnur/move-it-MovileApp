import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Circle, Callout } from "react-native-maps";
import star from "./../../assetsApp/starMini.png";
import { useNavigation } from "@react-navigation/native";

export const JobsMap = ({ route }) => {
  const { userLocation, postsToShow, maxDistance = "any" } = route.params;
  const [initialRegion, setInitialRegion] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (userLocation && maxDistance !== "any") {
      const radius = maxDistance * 1000;
      const latitudeDelta = radius / 111000;
      const longitudeDelta =
        radius / (111000 * Math.cos(userLocation.latitude * (Math.PI / 180)));

      setInitialRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: latitudeDelta * 2 + 0.01,
        longitudeDelta: longitudeDelta * 2 + 0.01,
      });
    } else if (userLocation) {
      setInitialRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      });
    }
  }, [userLocation, maxDistance]);

  const handlePress = (post) => {
    navigation.navigate("Details", { data: post });
  };
  return (
    <View style={styles.container}>
      {initialRegion && (
        <MapView style={styles.map} initialRegion={initialRegion}>
          {maxDistance !== "any" && (
            <Circle
              center={userLocation}
              radius={maxDistance * 1000}
              strokeWidth={2}
              strokeColor="rgba(0, 0, 255, 0.3)"
              fillColor="rgba(0, 0, 255, 0.1)"
            />
          )}
          <Marker coordinate={userLocation} title="your current location" />
          {postsToShow.map((post) => (
            <Marker
              key={post._id}
              coordinate={post.directions[0].location}
              title={post.title}
              description={post.description}
              image={star}
            >
              <Callout onPress={() => handlePress(post)}>
                <View style={styles.calloutContainer}>
                  <Text>{post.title}</Text>
                  <Text style={styles.pressableText}>See details</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  pressableText: {
    color: "blue",
  },
});
