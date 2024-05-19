import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Home } from "../screens/users/Home";
import { Post } from "../screens/users/post/Post";
import { Type } from "../screens/users/post/Type";
import { Dimen } from "../screens/users/post/Dimen";

const Stack = createStackNavigator();

export const Stacknavigators = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="Type" component={Type} />
      <Stack.Screen name="Dim" component={Dimen} />
      <Stack.Screen name="Post" component={Post} />
    </Stack.Navigator>
  );
};
