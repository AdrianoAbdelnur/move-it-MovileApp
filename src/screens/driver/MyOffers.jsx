import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyles from "../../styles/globalStyles";
import colors from "../../styles/colors";
import { AuthContext } from "../../contexts/AuthContext";
import { clientAxios } from "../../api/ClientAxios";
import { CustomModal } from "../../components/ui/CustomModal";
import { PostContext } from "../../contexts/PostsContext";

export const MyOffers = () => {
  const { state: userState } = useContext(AuthContext);
  const { uptateStatus } = useContext(PostContext);
  const [aceptedOffers, setAceptedOffers] = useState([]);

  useEffect(() => {
    getMyAceptedOffers();
  }, []);

  getMyAceptedOffers = async () => {
    try {
      let { data } = await clientAxios.get(
        "/offer/getMyAceptedOffers/" + userState.user.id
      );
      console.log(data.offersFound);
      data.offersFound.sort(
        (a, b) => new Date(a.post.date) - new Date(b.post.date)
      );
      console.log(data.offersFound);
      setAceptedOffers(data.offersFound);
    } catch (error) {
      console.log(error);
    }
  };

  let fDate = "";
  let fTime = "";

  const formatDate = (dateToFormat) => {
    const date = new Date(dateToFormat);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    fDate = `${day}/${month}/${year}`;
    fTime = `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  return (
    <View style={globalStyles.container}>
      <StatusBar style="auto" backgroundColor="gray" translucent={false} />
      <View style={styles.services_container}>
        <Text style={styles.servicesTitle}>Accepted services:</Text>
        <ScrollView style={styles.services}>
          <View>
            {aceptedOffers &&
              aceptedOffers?.map((item, index) => (
                <TouchableOpacity key={item._id} style={styles.itemContainer}>
                  {formatDate(item.post.date)}
                  <Text style={globalStyles.generalText}>
                    Type of goods: {item.post.goodsType}
                  </Text>
                  <Text style={globalStyles.generalText}>
                    from: {item.post.directions?.from?.description}
                  </Text>
                  <Text style={globalStyles.generalText}>
                    to: {item.post.directions?.to?.description}
                  </Text>
                  <Text style={globalStyles.generalText}>
                    Date: {fDate} at {fTime}
                  </Text>
                  <Text style={globalStyles.generalText}>
                    status: {item.post.status}
                  </Text>
                  <Text style={globalStyles.generalText}>
                    Price: {item.price}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      uptateStatus({
                        postId: item.post._id,
                        newStatus: "transportDone",
                      });
                    }}
                  >
                    <Text style={{ alignSelf: "flex-end", color: "black" }}>
                      Press here if the job has been completed
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: "white",
    fontSize: 25,
    margin: 10,
  },
  services_container: {
    width: "90%",
    maxHeight: "60%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 15,
  },
  servicesTitle: {
    color: "black",
    fontSize: 25,
    alignSelf: "flex-start",
    margin: 5,
  },
  services: {
    width: "85%",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    margin: 10,
    backgroundColor: colors.primary,
  },
  text: {
    color: "black",
    fontSize: 25,
    marginBottom: 5,
  },
  itemContainer: {
    backgroundColor: "#37474F",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 8,
    margin: 2,
    padding: 3,
  },
});
