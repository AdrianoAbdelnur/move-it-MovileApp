import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import globalStyles from "../../styles/globalStyles";
import StarRating from "../../components/rating/StarRating";
import { GeneralButton } from "../../components/ui/GeneralButton";
import { clientAxios } from "../../api/ClientAxios";
import { useNavigation } from "@react-navigation/native";

export const DriversReviews = ({ route }) => {
  const navigation = useNavigation();
  const { transport, addReview = false } = route.params;
  const [punctualityRating, setPunctualityRating] = useState(0);
  const [comunicationRating, setComunicationRating] = useState(0);
  const [generalServiceRating, setGeneralServiceRating] = useState(0);

  changereview = (newRating) => {
    setReview(newRating);
  };

  const onSubmit = async () => {
    if (
      punctualityRating != 0 &&
      comunicationRating != 0 &&
      generalServiceRating != 0
    ) {
      try {
        const review = {
          punctualityRating,
          comunicationRating,
          generalServiceRating,
        };
        const { data } = await clientAxios.patch(
          "/user/updateReviews/" + transport._id,
          review
        );
        navigation.navigate("home");
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert(
        "Error",
        "You must rate all items.",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={globalStyles.container}>
      {transport.review.reviewsQuantity !== 0 || addReview ? (
        <View>
          <Text style={globalStyles.generalText}>Punctuality Rating</Text>
          <StarRating
            rating={
              addReview
                ? punctualityRating
                : Math.round(transport.review.punctualityRating)
            }
            name={transport.given_name}
            changeRating={addReview ? setPunctualityRating : () => {}}
          />
          <Text style={globalStyles.generalText}>Comunication Rating</Text>
          <StarRating
            rating={
              addReview
                ? comunicationRating
                : Math.round(transport.review.comunicationRating)
            }
            name={transport.given_name}
            changeRating={addReview ? setComunicationRating : () => {}}
          />
          <Text style={globalStyles.generalText}>General Rating</Text>
          <StarRating
            rating={
              addReview
                ? generalServiceRating
                : Math.round(transport.review.generalServiceRating)
            }
            name={transport.given_name}
            changeRating={addReview ? setGeneralServiceRating : () => {}}
          />
          <View>
            {addReview && (
              <GeneralButton text={"submit"} onPressFunction={onSubmit} />
            )}
          </View>
        </View>
      ) : (
        <View>
          <Text style={globalStyles.generalText}>
            {transport.given_name} has no reviews yet
          </Text>
        </View>
      )}
    </View>
  );
};
