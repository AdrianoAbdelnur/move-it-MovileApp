import React, { useContext, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { FormContext } from "../../contexts/FormContext";
import colors from "../../styles/colors";

export const ItemsListShower = ({ item, index }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const handleItemPress = (index) => {
    setSelectedItemIndex(selectedItemIndex === index ? null : index);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => handleItemPress(index)}
      >
        <Text
          style={{
            color: item.details ? colors.background : "black",
            fontSize: 13,
          }}
        >
          {item.quantity} {item.name}
        </Text>
      </TouchableOpacity>
      {selectedItemIndex === index && item.details && (
        <View style={[styles.detailsItemContainer]}>
          {item?.details?.description && (
            <Text
              style={{
                color: "blue",
                flexShrink: 1,
                overflow: "hidden",
                textBreakStrategy: "balanced",
                marginLeft: 10,
              }}
            >
              Description: {item?.details?.description}
            </Text>
          )}
          {item?.details?.dimensions?.length && (
            <Text
              style={{
                color: "blue",
                marginLeft: 10,
              }}
            >
              length: {item?.details?.dimensions?.length}
            </Text>
          )}
          {item?.details?.dimensions?.width && (
            <Text
              style={{
                color: "blue",
                marginLeft: 10,
              }}
            >
              width: {item?.details?.dimensions?.width}
            </Text>
          )}
          {item?.details?.dimensions?.height && (
            <Text
              style={{
                color: "blue",
                marginLeft: 10,
              }}
            >
              height: {item?.details?.dimensions?.height}
            </Text>
          )}
          {item?.details?.dimensions?.weight && (
            <Text
              style={{
                color: "blue",
                marginLeft: 10,
              }}
            >
              weight: {item?.details?.dimensions?.weight}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};
