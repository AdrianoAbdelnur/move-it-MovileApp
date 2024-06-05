import React, { useContext, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FormUserContext } from "../../../contexts/FormUserContext";
import globalStyles from "../../../styles/globalStyles";
import { useFormatDate } from "../../../hooks/useFormatDate";
import { PostContext } from "../../../contexts/PostsContext";
import { useNavigation } from "@react-navigation/native";

export const PostConfirm = () => {
  const navigation = useNavigation();
  const { formData } = useContext(FormUserContext);
  const { addPost } = useContext(PostContext);
  const { formatDate, fDate, fTime } = useFormatDate();

  useEffect(() => {
    if (formData.date) {
      formatDate(formData.date);
    }
  }, []);

  const onSubmit = () => {
    addPost(formData);
    navigation.navigate("home");
  };

  return (
    <View style={[globalStyles.container, { alignItems: "flex-start" }]}>
      <Text style={globalStyles.generalInformationText}>
        Goods type : {formData.goodsType}
      </Text>
      <Text style={globalStyles.generalInformationText}>Load Dimensions:</Text>
      <Text style={[globalStyles.generalInformationText, { marginLeft: 20 }]}>
        height : {formData.dimensions.height} m
      </Text>
      <Text style={[globalStyles.generalInformationText, { marginLeft: 20 }]}>
        length : {formData.dimensions.length} m
      </Text>
      <Text style={[globalStyles.generalInformationText, { marginLeft: 20 }]}>
        width : {formData.dimensions.width} m
      </Text>
      <Text style={[globalStyles.generalInformationText, { marginLeft: 20 }]}>
        weight : {formData.dimensions.weight} Kg
      </Text>
      <Text style={globalStyles.generalInformationText}>Directions:</Text>
      <Text style={[globalStyles.generalInformationText, { marginLeft: 20 }]}>
        From: {formData.directions.from}
      </Text>
      <Text style={[globalStyles.generalInformationText, { marginLeft: 20 }]}>
        To: {formData.directions.to}
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
