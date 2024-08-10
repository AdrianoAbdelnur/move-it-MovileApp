import React, { useContext, useEffect, useState } from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyles from "../../../styles/globalStyles";
import data from "../../../assetsApp/itemsData.json";
import { Item } from "../../../components/item/Item";
import { FormContext } from "../../../contexts/FormContext";
import { ScrollView } from "react-native-gesture-handler";
import Entypo from "react-native-vector-icons/Entypo";
import colors from "../../../styles/colors";
import { useNavigation } from "@react-navigation/native";

export const ItemsList = ({ route }) => {
  const [filterText, setFilterText] = useState("");
  const { formData } = useContext(FormContext);
  const [filteredData, setFilteredData] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const navigation = useNavigation();
  const { leg } = route.params;
  const currentLeg = `leg${leg + 1}`;

  useEffect(() => {
    const filterData = data
      .map((category) => {
        const filteredItems = category.data.filter((item) =>
          item.name.toLowerCase().includes(filterText.toLowerCase())
        );
        return {
          title: category.title,
          data: filteredItems,
        };
      })
      .filter((category) => category.data.length > 0);
    setFilteredData(filterData);
  }, [filterText]);

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={globalStyles.input}
        placeholder="Filter items..."
        onChangeText={(text) => setFilterText(text)}
        value={filterText}
      />
      {formData?.itemsDetails[currentLeg].itemsList?.length > 0 && (
        <View>
          <Text style={styles.itemText}>Your List</Text>
          <Text style={[styles.itemText, { fontSize: 12 }]}>
            (You may add details to any item if you wish.)
          </Text>
        </View>
      )}
      {formData?.itemsDetails[currentLeg].itemsList?.length > 0 && (
        <ScrollView
          style={[
            styles.scrollList,
            {
              height:
                formData?.itemsDetails[currentLeg]?.itemsList?.length <= 4
                  ? 35 +
                    formData?.itemsDetails[currentLeg]?.itemsList?.length * 40
                  : 35 + 40 * 4,
            },
          ]}
        >
          {formData?.itemsDetails[currentLeg]?.itemsList?.map((item) => {
            return (
              <View style={styles.itemContainer} key={item.name}>
                <Text
                  style={[styles.itemText, { flex: 3 }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  - {item.quantity} {item.name}
                </Text>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() =>
                    navigation.navigate("ItemDetails", { data: item, leg })
                  }
                >
                  <Text
                    style={[
                      styles.itemText,
                      {
                        fontSize: 12,
                        color: item?.details ? "gray" : colors.primary,
                      },
                    ]}
                  >
                    {item?.details ? "see details" : "add details"}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      )}
      {filteredData.length > 0 ? (
        <SectionList
          sections={filteredData}
          renderItem={({ item, section }) => {
            if (expandedCategory === section.title) {
              return (
                <Item key={item.name} item={item} currentLeg={currentLeg} />
              );
            }
            return null;
          }}
          renderSectionHeader={({ section: { title } }) => (
            <TouchableOpacity
              style={[
                styles.headerContainer,
                expandedCategory === title && {
                  borderRadius: 0,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                },
              ]}
              onPress={() => {
                setExpandedCategory(expandedCategory === title ? null : title);
              }}
            >
              <Text style={styles.header}>{title}</Text>
              <Entypo
                name={
                  expandedCategory === title ? "chevron-up" : "chevron-down"
                }
                size={20}
                color="black"
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => item.name + index}
        />
      ) : (
        <View>
          <Text style={globalStyles.generalText}>
            That item is not in our options. Would you like to add it to your
            list?
          </Text>
          <Item
            key={filterText}
            item={{ name: filterText }}
            currentLeg={currentLeg}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "grey",
    padding: 10,
    minWidth: "100%",
    borderRadius: 20,
    marginBottom: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    minWidth: "100%",
  },
  itemContainer: {
    flexDirection: "row",
  },
  itemText: {
    fontSize: 16,
    color: "white",
  },
  scrollList: {
    width: "100%",
    margin: 10,
    marginBottom: 20,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 12,
  },
});
