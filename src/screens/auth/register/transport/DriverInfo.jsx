import React, { useContext, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FormContext } from "../../../../contexts/FormContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import globalStyles from "../../../../styles/globalStyles";
import { GeneralButton } from "../../../../components/ui/GeneralButton";
import { useNavigation } from "@react-navigation/native";
import { useFilePicker } from "../../../../hooks/useFilePicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useUpdateObj } from "../../../../hooks/useUpdateObj";

export const DriverInfo = () => {
  const { uploadFields } = useContext(AuthContext);
  const { formData, setFormData } = useContext(FormContext);
  const [updateObj] = useUpdateObj(setFormData);
  const { pickDocument, fileBase64, setFileBase64 } = useFilePicker();
  const navigation = useNavigation();

  useEffect(() => {
    if (fileBase64) {
      console.log("file", fileBase64);
      updateObj("transportInfo.policeCheckPdf", fileBase64);
      setFileBase64(null);
    }
  }, [fileBase64]);

  const onSubmit = () => {
    const keyValue = Object.entries(formData.transportInfo);
    for (const item of keyValue) {
      const [key, value] = item;
      if (value == true) {
        delete formData.transportInfo[key];
      }
    }
    uploadFields();
  };

  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <View style={globalStyles.container}>
        {!formData?.transportInfo?.profilePhotoImg ? (
          <GeneralButton
            text={"Profile Photo"}
            secondaryText={"(Selfie)"}
            icon={"camera"}
            onPressFunction={() => {
              navigation.navigate("Camera", {
                path: `transportInfo.profilePhotoImg`,
                photoType: "front",
              });
            }}
          />
        ) : (
          <TouchableOpacity
            style={styles.changePhotoButton}
            onPress={() => updateObj("transportInfo.profilePhotoImg", null)}
          >
            <Text>Profile Photo uploaded </Text>
            <Text>change?</Text>
          </TouchableOpacity>
        )}
        {!formData?.transportInfo?.licenseFrontImg ? (
          <GeneralButton
            text={"License Photo"}
            secondaryText={"(front)"}
            icon={"camera"}
            onPressFunction={() => {
              navigation.navigate("Camera", {
                path: `transportInfo.licenseFrontImg`,
              });
            }}
          />
        ) : (
          <TouchableOpacity
            style={styles.changePhotoButton}
            onPress={() => updateObj("transportInfo.licenseFrontImg", null)}
          >
            <Text>Licence front uploaded </Text>
            <Text>change?</Text>
          </TouchableOpacity>
        )}
        {!formData?.transportInfo?.licenseBackImg ? (
          <GeneralButton
            text={"License Photo"}
            secondaryText={"(back)"}
            icon={"camera"}
            onPressFunction={() => {
              navigation.navigate("Camera", {
                path: `transportInfo.licenseBackImg`,
              });
            }}
          />
        ) : (
          <TouchableOpacity
            style={styles.changePhotoButton}
            onPress={() => updateObj("transportInfo.licenseBackImg", null)}
          >
            <Text>Licence back uploaded </Text>
            <Text>change?</Text>
          </TouchableOpacity>
        )}
        {!formData?.transportInfo?.policeCheckPdf ? (
          <GeneralButton
            text={"Police Check"}
            secondaryText={".PDF"}
            icon={"archive"}
            onPressFunction={() => pickDocument()}
          />
        ) : (
          <TouchableOpacity
            style={styles.changePhotoButton}
            onPress={() => updateObj("transportInfo.policeCheckPdf", null)}
          >
            <Text>Police Check uploaded </Text>
            <Text>change?</Text>
          </TouchableOpacity>
        )}
        <GeneralButton text={"Submit"} onPressFunction={() => onSubmit()} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  changePhotoButton: {
    backgroundColor: "grey",
    minWidth: "80%",
    height: 60,
    padding: 8,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});
