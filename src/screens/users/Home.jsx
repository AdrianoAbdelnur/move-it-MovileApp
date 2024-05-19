import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const Home = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.general_container}>
      <View style={styles.container}>
        <StatusBar style="auto" backgroundColor="gray" translucent={false} />
        <TouchableOpacity
          style={styles.OptionsButton}
          onPress={() => navigation.navigate("Type")}
        >
          <Text style={styles.buttonText}>Publish a transport</Text>
        </TouchableOpacity>
        <View style={styles.services_container}>
          <Text style={styles.servicesTitle}>Your Services:</Text>
          <ScrollView style={styles.services}>
            <View>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
              <Text style={styles.text}>¡Hola, mundo!</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  general_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#34495e",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  OptionsButton: {
    width: 350,
    height: 75,
    backgroundColor: "blue",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 25,
    margin: 10,
  },
  services_container: {
    width: "90%",
    maxHeight: "60%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 15,
  },
  servicesTitle: {
    color: "black",
    fontSize: 25,
    alignSelf: "flex-start",
    margin: 5,
  },
  services: {
    width: "85%",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    margin: 10,
    backgroundColor: "blue",
  },
  text: {
    color: "black",
    fontSize: 25,
    marginBottom: 5,
  },
});
