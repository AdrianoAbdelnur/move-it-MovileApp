import React, { useContext, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { PhotoButton } from "../../../../components/ui/PhotoButton";
import { FormContext } from "../../../../contexts/FormContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import globalStyles from "../../../../styles/globalStyles";
import { GeneralButton } from "../../../../components/ui/GeneralButton";
import { useNavigation } from "@react-navigation/native";
import { useFilePicker } from "../../../../hooks/useFilePicker";
import { TouchableOpacity } from "react-native-gesture-handler";

export const DriverInfo = () => {
  const { uploadFields, state: user, changeStatus } = useContext(AuthContext);
  const { formData, setFormData } = useContext(FormContext);
  const { pickDocument, fileBase64, setFileBase64 } = useFilePicker();
  const navigation = useNavigation();

  useEffect(() => {
    if (fileBase64) {
      setFormData({
        transportInfo: {
          ...formData.transportInfo,
          policeCheckPdf: fileBase64,
        },
      });
      changeStatus({ ["policeCheckPdf"]: true });
      setFileBase64(null);
    }
  }, [fileBase64]);

  const onSubmit = () => {
    uploadFields();
  };
  return (
    <KeyboardAvoidingView style={globalStyles.KeyboardAvoidingView}>
      <View style={globalStyles.container}>
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
            onPress={() =>
              setFormData({
                ...formData,
                transportInfo: {
                  ...formData?.transportInfo,
                  licenseFrontImg: null,
                },
              })
            }
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
            onPress={() =>
              setFormData({
                ...formData,
                transportInfo: {
                  ...formData?.transportInfo,
                  licenseBackImg: null,
                },
              })
            }
          >
            <Text>Licence back uploaded </Text>
            <Text>change?</Text>
          </TouchableOpacity>
        )}
        <PhotoButton
          primaryText={"Upload Police Check"}
          secondaryText={".PDF"}
          icon={"archive"}
          fileName={"policeCheckPdf"}
          onPressFunction={() => pickDocument()}
        />
        <GeneralButton text={"Submit"} onPressFunction={() => onSubmit()} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  changePhotoButton: {
    backgroundColor: "grey",
    minWidth: "70%",
    padding: 8,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});
