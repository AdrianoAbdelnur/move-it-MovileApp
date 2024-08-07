import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext, useState } from "react";
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
import { SelectRegisterType } from "../screens/auth/register/SelectRegisterType";
import { PersonalInf } from "../screens/auth/register/transport/PersonalInf";
import { TransportInfo } from "../screens/auth/register/transport/TransportInfo";
import { CameraManager } from "../components/camera/CameraManager";
import { DriverInfo } from "../screens/auth/register/transport/DriverInfo";
import { CompleteProfile } from "../screens/auth/register/transport/CompleteProfile";
import { WaitForAuth } from "../screens/auth/register/transport/WaitForAuth";
import { DriversReviews } from "../screens/users/DriversReviews";
import { TransportConfirm } from "../screens/users/TransportConfirm";
import { PostsList } from "../screens/PostsList";
import { ItemsList } from "../screens/users/post/ItemsList";
import { ItemDetails } from "../screens/users/post/ItemDetails";
import { Title } from "../screens/users/post/Title";
import { DetailsSelector } from "../screens/users/post/DetailsSelector";
import { ImageDisplayer } from "../components/imageDisplayer/ImageDisplayer";

const Stack = createStackNavigator();

export const Stacknavigators = () => {
  const { state } = useContext(AuthContext);
  const [chatWith, setChatWith] = useState({});

  const isLogged = state.isLogged;
  const role = state?.user?.role;
  const infoCompletedFlag = state?.user?.infoCompletedFlag;
  const authorizedTransport = state?.user?.authorizedTransport;

  if (state.isLoading) {
    return <LoadingComponent />;
  }

  if (!isLogged) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="SelectRegister" component={SelectRegisterType} />
        <Stack.Screen name="PersonalTransport" component={PersonalInf} />
        <Stack.Screen name="TransportInfo" component={TransportInfo} />
      </Stack.Navigator>
    );
  }

  if (isLogged && role == "user") {
    return (
      <Stack.Navigator>
        <Stack.Screen name="home">
          {(props) => <Home {...props} setChatWith={setChatWith} />}
        </Stack.Screen>
        <Stack.Screen name="PostsList">
          {(props) => <PostsList {...props} setChatWith={setChatWith} />}
        </Stack.Screen>
        <Stack.Screen
          name="chat"
          component={ChatScreen}
          options={{ title: `Chat with ${chatWith}` }}
        />
        <Stack.Screen name="Title" component={Title} />
        <Stack.Screen name="DetailsSelector" component={DetailsSelector} />
        <Stack.Screen name="Type" component={Type} />
        <Stack.Screen name="ItemsList" component={ItemsList} />
        <Stack.Screen name="ItemDetails" component={ItemDetails} />
        <Stack.Screen name="Dimensions" component={Dimen} />
        <Stack.Screen name="post" component={Post} />
        <Stack.Screen name="Directions" component={Directions} />
        <Stack.Screen name="Date" component={DateSelect} />
        <Stack.Screen name="Confirmation" component={PostConfirm} />
        <Stack.Screen name="Details" component={PostDetails} />
        <Stack.Screen name="OffersList" component={OffersList} />
        <Stack.Screen name="Reviews" component={DriversReviews} />
        <Stack.Screen name="TransporConfirm" component={TransportConfirm} />
        <Stack.Screen name="Camera" component={CameraManager} />
        <Stack.Screen name="Image" component={ImageDisplayer} />
      </Stack.Navigator>
    );
  }

  if (isLogged && role === "transport" && authorizedTransport) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="driverHome"
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: colors.border,
            },
            headerTintColor: "#FFF",
          }}
        >
          {(props) => <DriverHome {...props} setChatWith={setChatWith} />}
        </Stack.Screen>
        <Stack.Screen name="Details" component={PostDetails} />
        <Stack.Screen name="Offer" component={Offer} />
        <Stack.Screen name="MyOffers">
          {(props) => <MyOffers {...props} setChatWith={setChatWith} />}
        </Stack.Screen>
        <Stack.Screen name="Maps" component={Maps} />
        <Stack.Screen
          name="chat"
          component={ChatScreen}
          options={{ title: `Chat with ${chatWith}` }}
        />
        <Stack.Screen name="Image" component={ImageDisplayer} />
      </Stack.Navigator>
    );
  }

  if (isLogged && role === "transport" && !infoCompletedFlag) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
        <Stack.Screen name="TransportInfo" component={TransportInfo} />
        <Stack.Screen name="DriverInfo" component={DriverInfo} />
        <Stack.Screen name="Camera" component={CameraManager} />
      </Stack.Navigator>
    );
  }

  if (
    isLogged &&
    role === "transport" &&
    infoCompletedFlag &&
    !authorizedTransport
  ) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="WaitingForAuthorization" component={WaitForAuth} />
      </Stack.Navigator>
    );
  }
};
