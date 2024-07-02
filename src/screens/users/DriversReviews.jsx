import React, { useState } from "react";
import { Text, View } from "react-native";
import globalStyles from "../../styles/globalStyles";
import StarRating from "../../components/rating/StarRating";

export const DriversReviews = ({ route }) => {
  const { item } = route.params;
  const [rating, setRating] = useState(3);
  const changeRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <View style={globalStyles.container}>
      {item.owner.review.reviewsQuantity == 0 ? (
        <View>
          <Text style={globalStyles.generalText}>
            {item.owner.given_name} has no reviews yet
          </Text>
        </View>
      ) : (
        <View>
          <Text style={globalStyles.generalText}>Punctuality Rating</Text>
          <StarRating
            rating={item.owner.review.punctualityRating}
            name={item.owner.given_name}
          />
          <Text style={globalStyles.generalText}>Comunication Rating</Text>
          <StarRating
            rating={item.owner.review.comunicationRating}
            name={item.owner.given_name}
          />
          <Text style={globalStyles.generalText}>General Rating</Text>
          <StarRating
            rating={item.owner.review.generalServiceRating}
            name={item.owner.given_name}
          />
        </View>
      )}
    </View>
  );
};
