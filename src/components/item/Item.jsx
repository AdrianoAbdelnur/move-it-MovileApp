import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../styles/colors";
import { FormContext } from "../../contexts/FormContext";

export const Item = ({ item, currentLeg }) => {
  const { formData, setFormData } = useContext(FormContext);
  const initialQuantity =
    formData?.itemsDetails[currentLeg]?.itemsList.find(
      (i) => i.name === item.name
    )?.quantity || 0;
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setFormData((prevFormData) => {
      const itemIndex = prevFormData?.itemsDetails[
        currentLeg
      ]?.itemsList?.findIndex((i) => i.name === item.name);
      if (quantity === 0) {
        if (itemIndex !== -1) {
          return {
            ...prevFormData,
            itemsDetails: {
              ...prevFormData.itemsDetails,
              [currentLeg]: {
                ...prevFormData?.itemsDetails[currentLeg],
                itemsList: prevFormData?.itemsDetails[
                  currentLeg
                ]?.itemsList?.filter((_, index) => index !== itemIndex),
              },
            },
          };
        }
        return prevFormData;
      }
      if (itemIndex !== -1) {
        const updatedList = [
          ...prevFormData?.itemsDetails[currentLeg]?.itemsList,
        ];
        updatedList[itemIndex].quantity = quantity;
        return {
          ...prevFormData,
          itemsDetails: {
            ...prevFormData.itemsDetails,
            [currentLeg]: {
              ...prevFormData.itemsDetails[currentLeg],
              itemsList: updatedList,
            },
          },
        };
      } else {
        return {
          ...prevFormData,
          itemsDetails: {
            ...prevFormData?.itemsDetails,
            [currentLeg]: {
              ...prevFormData?.itemsDetails[currentLeg],
              itemsList: [
                ...prevFormData?.itemsDetails[currentLeg]?.itemsList,
                { name: item.name, quantity },
              ],
            },
          },
        };
      }
    });
  }, [quantity]);

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemContainer} key={`${item.name}`}>
        <Text style={styles.itemText}>{item.name}</Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity style={styles.updownContainer} onPress={decrement}>
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterText}>{quantity}</Text>
          <TouchableOpacity style={styles.updownContainer} onPress={increment}>
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    maxWidth: "100%",
  },
  itemText: {
    flex: 3,
    fontSize: 16,
    color: "white",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  counterContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 35,
  },
  updownContainer: {
    width: 35,
    height: 35,
    backgroundColor: colors.primary,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 12.5,
    justifyContent: "center",
    alignItems: "center",
  },
  counterText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginHorizontal: 5,
  },
});
