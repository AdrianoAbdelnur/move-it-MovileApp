import React, { useContext, useEffect } from "react";
import { KeyboardAvoidingView, TextInput, View } from "react-native";
import { PhotoButton } from "../../../../components/ui/PhotoButton";
import { FormContext } from "../../../../contexts/FormContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import globalStyles from "../../../../styles/globalStyles";
import { GeneralButton } from "../../../../components/ui/GeneralButton";
import { useNavigation } from "@react-navigation/native";
import { useFilePicker } from "../../../../hooks/useFilePicker";

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
        <PhotoButton
          primaryText={"License Photo"}
          secondaryText={"(front)"}
          icon={"camera"}
          fileName={"licenseFrontImg"}
          onPressFunction={() =>
            navigation.navigate("Camera", { saveAs: "licenseFrontImg" })
          }
        />
        <PhotoButton
          primaryText={"License Photo"}
          secondaryText={"(back)"}
          icon={"camera"}
          fileName={"licenseBackImg"}
          onPressFunction={() =>
            navigation.navigate("Camera", { saveAs: "licenseBackImg" })
          }
        />

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
