import React, { useEffect, useRef, useState } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { EXPO_PUBLIC_GOOGLE_MAP_KEY } from "@env";
import * as Location from "expo-location";
import truckLocation from "./../../assetsApp/truckLocation.png";
import MapViewDirections from "react-native-maps-directions";
import colors from "../../styles/colors";
import Directions from "./Directions";

export const Maps = ({ route }) => {
  const mapRef = useRef();
  const directions = route.params.directions;
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    getLocationPermission();
  }, []);

  useEffect(() => {
    moveTo();
    setTimeout(() => {
      fitMapToCoordinates();
    }, 1500);
  }, [currentLocation]);

  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permiso denegado");
      return;
    }
    let location = await Location.getCurrentPositionAsync();
    const currentLoc = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setCurrentLocation(currentLoc);
  };

  const fitMapToCoordinates = () => {
    mapRef.current?.fitToCoordinates(
      [currentLocation, ...directions.map((direction) => direction.location)],
      {
        edgePadding: { top: 120, right: 70, bottom: 150, left: 70 },
        animated: true,
      }
    );
  };

  const moveTo = async () => {
    try {
      const camera = await mapRef.current?.getCamera();
      if (camera) {
        camera.center = currentLocation;
        camera.zoom = 16;
        mapRef.current.animateCamera(camera, { duration: 1500 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openNavigation = () => {
    const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
    const destination = `${
      directions[directions.length - 1].location.latitude
    },${directions[directions.length - 1].location.longitude}`;
    const waypoints = directions
      .slice(0, directions.length - 1)
      .map(
        (direction) =>
          `${direction.location.latitude},${direction.location.longitude}`
      )
      .join("|");
    const travelmode = "driving";
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=${travelmode}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Directions directions={directions} />
      <MapView
        style={styles.map}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -34.92588637283261,
          longitude: 138.59506596659415,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        }}
        showsCompass={true}
      >
        {currentLocation && (
          <Marker coordinate={currentLocation} image={truckLocation}>
            <Callout>
              <View>
                <Text>Your location</Text>
              </View>
            </Callout>
          </Marker>
        )}
        {directions.map((direction, index) => (
          <Marker
            key={index}
            coordinate={direction.location}
            title={direction.description}
          />
        ))}
        {currentLocation && directions.length > 0 && (
          <>
            <MapViewDirections
              origin={currentLocation}
              destination={directions[0].location}
              apikey={EXPO_PUBLIC_GOOGLE_MAP_KEY}
              strokeWidth={4}
              strokeColor="purple"
            />
            {directions.slice(1).map((direction, index) => (
              <MapViewDirections
                key={index}
                origin={directions[index].location}
                destination={direction.location}
                apikey={EXPO_PUBLIC_GOOGLE_MAP_KEY}
                strokeWidth={4}
                strokeColor="purple"
              />
            ))}
          </>
        )}
      </MapView>
      <TouchableOpacity style={styles.button} onPress={openNavigation}>
        <Text style={styles.buttonText}>Go to Navigator</Text>
      </TouchableOpacity>
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
  instructionsContainer: {
    position: "absolute",
    bottom: 20,
    width: "90%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  instruction: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    position: "absolute",
    bottom: 20,
    width: "90%",
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default Maps;
