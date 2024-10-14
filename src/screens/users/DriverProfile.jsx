import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import globalStyles from "../../styles/globalStyles";
import StarRating from "../../components/rating/StarRating";
import { GeneralButton } from "../../components/ui/GeneralButton";
import { clientAxios } from "../../api/ClientAxios";
import { useNavigation } from "@react-navigation/native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../styles/colors";

export const DriverProfile = ({ route }) => {
  const navigation = useNavigation();
  const { transport, addReview = false } = route.params;
  const [punctualityRating, setPunctualityRating] = useState(0);
  const [comunicationRating, setComunicationRating] = useState(0);
  const [generalServiceRating, setGeneralServiceRating] = useState(0);
  const [reviewDetail, setReviewDetail] = useState();

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
          review: reviewDetail,
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

  const getImage = async (imageType) => {
    try {
      const { data } = await clientAxios(
        "/user/getImage/" + transport._id + "/" + imageType
      );
      if (data.imageData) {
        navigation.navigate("Image", { image: data.imageData });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <ScrollView style={{ width: "100%" }}>
        {!addReview && (
          <View>
            <Text
              style={[
                globalStyles.generalText,
                { fontSize: 20, textDecorationLine: "underline" },
              ]}
            >
              Profile
            </Text>
            <Text style={globalStyles.generalText}>
              Name: {transport.given_name} {transport.family_name}
            </Text>
            <Text style={globalStyles.generalText}>
              Vehicle type: {transport?.transportInfo?.vehicle}
            </Text>
            <TouchableOpacity onPress={() => getImage("generalImg")}>
              <Text
                style={[
                  globalStyles.generalText,
                  { marginLeft: 20, color: colors.primary },
                ]}
              >
                View vehicle overview photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => getImage("cargoAreaImg")}>
              <Text
                style={[
                  globalStyles.generalText,
                  { marginLeft: 20, color: colors.primary },
                ]}
              >
                View the vehicle's cargo area
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {transport.review.reviewsQuantity !== 0 || addReview ? (
          <View style={{ width: "100%" }}>
            <Text
              style={[
                globalStyles.generalText,
                { fontSize: 20, textDecorationLine: "underline" },
              ]}
            >
              Rating:
            </Text>
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
            {!addReview && (
              <Text
                style={[
                  globalStyles.generalText,
                  { fontSize: 20, textDecorationLine: "underline" },
                ]}
              >
                Reviews:
              </Text>
            )}
            {!addReview &&
              transport.review.review.slice(0, 3).map((item, index) => (
                <Text key={index} style={{ color: "white", marginLeft: 10 }}>
                  -{item}
                </Text>
              ))}
            {!addReview && transport.review.review.length > 3 && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Reviews", {
                    listReviews: transport.review.review,
                  })
                }
              >
                <Text
                  style={[
                    globalStyles.generalText,
                    {
                      marginLeft: 20,
                      color: colors.primary,
                      alignSelf: "flex-end",
                    },
                  ]}
                >
                  See more reviews
                </Text>
              </TouchableOpacity>
            )}
            <View>
              {addReview && (
                <View>
                  <Text
                    style={[
                      globalStyles.generalText,
                      { fontSize: 20, textDecorationLine: "underline" },
                    ]}
                  >
                    Write a review for {transport.given_name}:
                  </Text>
                  <TextInput
                    style={styles.multilineInput}
                    multiline
                    numberOfLines={2}
                    value={reviewDetail}
                    placeholder="review"
                    onChangeText={(value) => setReviewDetail(value)}
                  />
                  <GeneralButton text={"submit"} onPressFunction={onSubmit} />
                </View>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  multilineInput: {
    width: "100%",
    borderColor: colors.border,
    height: 75,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    color: colors.textPrimary,
    textAlignVertical: "top",
  },
});
