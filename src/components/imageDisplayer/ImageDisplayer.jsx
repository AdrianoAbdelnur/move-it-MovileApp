import React, { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FormContext } from "../../contexts/FormContext";

export const ImageDisplayer = ({ route }) => {
  const { formData, setFormData } = useContext(FormContext);
  const { image } = route.params;
  const base64Image = `data:image/jpeg;base64,${image}`;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: base64Image }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
