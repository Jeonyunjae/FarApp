
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/Login/Welcome";
import Login from "../screens/Login/Login";
import CreateAccount from "../screens/Login/CreateAccount";
import LinkingConfiguration from "./LinkingConfiguration";

const Stack = createNativeStackNavigator();

export default function LoggedOutNav() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Welcome"
        options={{
          headerShown: false,
        }}
        component={Welcome}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
}
