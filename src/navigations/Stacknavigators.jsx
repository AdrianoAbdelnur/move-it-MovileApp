import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { Home } from "../screens/users/Home";
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
import { DriverProfile } from "../screens/users/DriverProfile";
import { PersonalInf } from "../screens/auth/register/PersonalInf";
import { AccountSuspended } from "../screens/driver/AccountSuspended";
import { Image, TouchableOpacity } from "react-native";
import { usePushNotifications } from "../hooks/usePushNotifications";
import { Entypo } from "@expo/vector-icons";
import { MailValidation } from "../screens/auth/register/MailValidation";
import { EnterMail } from "../screens/auth/forgotPass/EnterMail";
import { NewPass } from "../screens/auth/forgotPass/NewPass";

const Stack = createStackNavigator();

export const Stacknavigators = () => {
  const { state, updateExpoPushToken, checkToken, logout } =
    useContext(AuthContext);
  const { expoPushToken } = usePushNotifications();
  const [chatWith, setChatWith] = useState({});
  const [activeSuspensions, setActiveSuspensions] = useState([]);
  const [hasActiveSuspension, setHasActiveSuspension] = useState(false);

  const isLogged = state.isLogged;
  const role = state?.user?.role;
  const infoCompletedFlag = state?.user?.infoCompletedFlag;
  const authorizedTransport = state?.user?.authorizedTransport;
  const accountSuspended = state?.user?.accountSuspended;
  const validatedMail = state?.user?.validatedMail;

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const suspensions = accountSuspended?.filter((suspension) => {
      const suspensionEndDate = suspension.suspensionEndDate
        ? new Date(suspension.suspensionEndDate)
        : null;
      return !suspensionEndDate || suspensionEndDate > currentDate;
    });

    setActiveSuspensions(suspensions);
    setHasActiveSuspension(suspensions?.length > 0);

    if (expoPushToken !== state?.user?.expoPushToken) {
      updateExpoPushToken(expoPushToken);
    }
  }, [state]);

  if (state.isLoading) {
    return <LoadingComponent />;
  }

  if (!isLogged) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="SelectRegister" component={SelectRegisterType} />
        <Stack.Screen name="PersonalInfo" component={PersonalInf} />
        <Stack.Screen name="TransportInfo" component={TransportInfo} />
        <Stack.Screen name="EnterMail" component={EnterMail} />
        <Stack.Screen name="Validation" component={MailValidation} />
        <Stack.Screen name="NewPass" component={NewPass} />
      </Stack.Navigator>
    );
  }
  console.log(isLogged, validatedMail);
  if (isLogged && !validatedMail) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Validation" component={MailValidation} />
      </Stack.Navigator>
    );
  }

  if (isLogged && role == "user") {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.border,
          },
          headerTintColor: "#FFF",
        }}
      >
        <Stack.Screen
          name="home"
          options={{
            title: "Home",
            headerRight: () => (
              <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Entypo
                  name="log-out"
                  size={18}
                  color="white"
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
            ),
          }}
        >
          {(props) => <Home {...props} setChatWith={setChatWith} />}
        </Stack.Screen>
        <Stack.Screen
          name="PostsList"
          options={{
            title: "Posts list",
          }}
        >
          {(props) => <PostsList {...props} setChatWith={setChatWith} />}
        </Stack.Screen>
        <Stack.Screen
          name="chat"
          component={ChatScreen}
          options={{ title: `Chat with ${chatWith}` }}
        />
        <Stack.Screen name="Title" component={Title} />
        <Stack.Screen name="Date" component={DateSelect} />
        <Stack.Screen name="Directions" component={Directions} />
        <Stack.Screen name="DetailsSelector" component={DetailsSelector} />
        <Stack.Screen name="ItemsList" component={ItemsList} />
        <Stack.Screen name="ItemDetails" component={ItemDetails} />
        <Stack.Screen name="Confirmation" component={PostConfirm} />
        <Stack.Screen name="Details" component={PostDetails} />
        <Stack.Screen name="OffersList" component={OffersList} />
        <Stack.Screen name="Reviews" component={DriversReviews} />
        <Stack.Screen name="DriverProfile" component={DriverProfile} />
        <Stack.Screen name="TransporConfirm" component={TransportConfirm} />
        <Stack.Screen name="Camera" component={CameraManager} />
        <Stack.Screen name="Image" component={ImageDisplayer} />
      </Stack.Navigator>
    );
  }

  if (isLogged && role === "transport" && hasActiveSuspension) {
    const suspensionReason = activeSuspensions[0]?.reason;
    const suspensionEndDate = activeSuspensions[0]?.suspensionEndDate;

    return (
      <Stack.Navigator>
        <Stack.Screen
          name="AccountSuspended"
          component={AccountSuspended}
          initialParams={{ reason: suspensionReason, suspensionEndDate }}
        />
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
            headerRight: () => (
              <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Entypo
                  name="log-out"
                  size={18}
                  color="white"
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: "grey",
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
