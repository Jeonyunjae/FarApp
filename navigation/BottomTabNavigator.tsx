import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import TabFive from "./TabNavigation/TabFive";
import TabFour from "./TabNavigation/TabFour";
import TabOne from "./TabNavigation/TabOne";
import TabThree from "./TabNavigation/TabThree";
import TabTwo from "./TabNavigation/TabTwo";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
export function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarShowLabel: false,
        headerShown: false
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOne}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
            tabBarIcon: ({ color }) => <TabBarIcon name="people-outline" color={color} />,
            headerRight: () => (
              <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Ionicons
                name="code"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
          title: "Tab Chat",
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwo}
        options={{
          title: "Tab Chat",
          tabBarIcon: ({ color }) => <TabBarIcon name="chatbubbles-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabThree}
        options={{
          title: "Tab Community",
          tabBarIcon: ({ color }) => <TabBarIcon name="home-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabFour"
        component={TabFour}
        options={{
          title: "Tab Region",
          tabBarIcon: ({ color }) => <TabBarIcon name="location-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabFive"
        component={TabFive}
        options={{
          title: "Tab User",
          tabBarIcon: ({ color }) => <TabBarIcon name="apps-outline" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={26} style={{ marginBottom: -15 }} {...props} />;
}