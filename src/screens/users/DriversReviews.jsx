import React, { useState } from "react";
import { Alert, FlatList, ScrollView, Text, View } from "react-native";
import globalStyles from "../../styles/globalStyles";
import StarRating from "../../components/rating/StarRating";
import { GeneralButton } from "../../components/ui/GeneralButton";
import { clientAxios } from "../../api/ClientAxios";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../styles/colors";

export const DriversReviews = ({ route }) => {
  const { listReviews } = route.params;

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={listReviews}
        renderItem={({ item }) => (
          <Text style={{ color: "white", marginLeft: 10, margin: 5 }}>
            * {item}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
