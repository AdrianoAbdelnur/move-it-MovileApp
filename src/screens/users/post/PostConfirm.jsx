import React, { useContext, useEffect } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../../styles/globalStyles";
import { useFormatDate } from "../../../hooks/useFormatDate";
import { PostContext } from "../../../contexts/PostsContext";
import { useNavigation } from "@react-navigation/native";
import { FormContext } from "../../../contexts/FormContext";

export const PostConfirm = () => {
  const navigation = useNavigation();
  const { formData, setFormData } = useContext(FormContext);
  const { addPost, state: postsState, clearAlertMsg } = useContext(PostContext);
  const { formatDate, fDate, fTime } = useFormatDate();

  useEffect(() => {
    if (formData.date) {
      formatDate(formData.date);
    }
  }, []);

  useEffect(() => {
    if (postsState.alertMsg === "New Post added") {
      Alert.alert("POST INFORMATION", postsState.alertMsg, [
        {
          text: "OK",
          onPress: () => handleOk(),
        },
      ]);
    }
  }, [postsState]);

  const handleOk = () => {
    clearAlertMsg();
    setFormData({});
    navigation.navigate("home");
    console.log("hola");
  };

  const onSubmit = () => {
    addPost(formData);
  };

  return (
    <View style={[globalStyles.container, { alignItems: "flex-start" }]}>
      <Text style={globalStyles.generalInformationText}>
        Goods type : {formData?.goodsType}
      </Text>
      <Text style={globalStyles.generalInformationText}>Load Dimensions:</Text>
      <Text style={[globalStyles.generalInformationText, { marginLeft: 20 }]}>
        height : {formData?.dimensions?.height} m
      </Text>
      <Text style={[globalStyles.generalInformationText, { marginLeft: 20 }]}>
        length : {formData?.dimensions?.length} m
      </Text>
      <Text style={[globalStyles.generalInformationText, { marginLeft: 20 }]}>
        width : {formData?.dimensions?.width} m
      </Text>
      <Text style={[globalStyles.generalInformationText, { marginLeft: 20 }]}>
        weight : {formData?.dimensions?.weight} Kg
      </Text>
      <Text style={globalStyles.generalInformationText}>Directions:</Text>
      <Text style={[globalStyles.generalInformationText, { marginLeft: 20 }]}>
        From: {formData?.directions?.from?.description}
      </Text>
      <Text style={[globalStyles.generalInformationText, { marginLeft: 20 }]}>
        To: {formData?.directions?.to?.description}
      </Text>
      <Text style={globalStyles.generalInformationText}>date : {fDate}</Text>
      <Text style={globalStyles.generalInformationText}>time : {fTime}</Text>
      <View style={globalStyles.nextButtonContainer}>
        <TouchableOpacity style={globalStyles.nextButton} onPress={onSubmit}>
          <Text style={globalStyles.textButtons}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
