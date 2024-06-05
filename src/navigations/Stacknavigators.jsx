import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { Home } from "../screens/users/Home";
import { Post } from "../screens/users/post/Post";
import { Type } from "../screens/users/post/Type";
import { Dimen } from "../screens/users/post/Dimen";
import { Directions } from "../screens/users/post/Directions";
import { DateSelect } from "../screens/users/post/DateSelect";
import { PostConfirm } from "../screens/users/post/PostConfirm";
import { Login } from "../screens/auth/Login";
import { AuthContext } from "../contexts/AuthContext";

import { LoadingComponent } from "../components/ui/LoadingComponent";
import { ChatScreen } from "../screens/chat/ChatScreen";
import { DriverHome } from "../screens/driver/DriverHome";
import colors from "../styles/colors";
import { PostDetails } from "../screens/users/post/PostDetails";
import { Maps } from "../components/ui/Maps";
import { Offer } from "../screens/driver/Offer";
import { MyOffers } from "../screens/driver/MyOffers";
import { OffersList } from "../screens/users/OffersList";

const Stack = createStackNavigator();

export const Stacknavigators = () => {
  const { state } = useContext(AuthContext);

  const isLogged = state.isLogged;
  const role = state?.user?.role;

  if (state.isLoading) {
    return <LoadingComponent />;
  }

  if (!isLogged) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login} />
      </Stack.Navigator>
    );
  }

  if (isLogged && role == "user") {
    return (
      <Stack.Navigator>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="chat" component={ChatScreen} />
        <Stack.Screen name="Type" component={Type} />
        <Stack.Screen name="Dimensions" component={Dimen} />
        <Stack.Screen name="post" component={Post} />
        <Stack.Screen name="Directions" component={Directions} />
        <Stack.Screen name="Date" component={DateSelect} />
        <Stack.Screen name="Confirmation" component={PostConfirm} />
        <Stack.Screen name="Details" component={PostDetails} />
        <Stack.Screen name="OffersList" component={OffersList} />
        <Stack.Screen name="Maps" component={Maps} />
      </Stack.Navigator>
    );
  }

  if (isLogged && role === "transport") {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="driverHome"
          component={DriverHome}
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: colors.border,
            },
            headerTintColor: "#FFF", // Color del texto del título (opcional)
          }}
        />
        <Stack.Screen name="Details" component={PostDetails} />
        <Stack.Screen name="Offer" component={Offer} />
        <Stack.Screen name="MyOffers" component={MyOffers} />
      </Stack.Navigator>
    );
  }
};