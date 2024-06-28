import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AuthContext } from "../../contexts/AuthContext";
import { FormContext } from "../../contexts/FormContext";

export const PhotoButton = ({
  primaryText,
  secondaryText,
  onPressFunction,
  icon,
  fileName,
}) => {
  const { state, changeStatus } = useContext(AuthContext);
  const { formData, setFormData } = useContext(FormContext);

  const changeStatusFunction = () => {
    changeStatus({ [fileName]: false });
    if (formData.transportInfo[fileName]) {
      const newObjet = { ...formData };
      delete newObjet.transportInfo[fileName];
      setFormData(newObjet);
    }
  };

  return (
    <>
      {state?.user?.transportInfo[fileName] ? (
        <TouchableOpacity onPress={changeStatusFunction}>
          <View style={styles.changeContainer}>
            <Text style={styles.buttonText}>
              {`${primaryText} ${secondaryText}`} added
            </Text>
            <Text style={styles.buttonText}>
              <Text style={styles.buttonText}>change?</Text>
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.GeneralButton}
          onPress={onPressFunction}
        >
          <View style={styles.infoContainer}>
            <View style={styles.iconContainer}>
              <Entypo name={icon} size={28} color={"#f1f1f1"} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>{primaryText}</Text>
              <Text style={styles.secondaryButtonText}>{secondaryText}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  GeneralButton: {
    width: "100%",
    height: 60,
    backgroundColor: "gray",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  changeContainer: {
    minWidth: "100%",
    borderWidth: 2,
    borderBlockColor: "black",
    borderRadius: 20,
    backgroundColor: "rgba(64, 64, 64, 0.8)",
    marginBottom: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    width: "100%",
    flexDirection: "row",
  },
  iconContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  secondaryButtonText: {
    color: "white",
    fontSize: 12,
  },
});
