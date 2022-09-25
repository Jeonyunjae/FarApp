import {
  NavigationContainer,
} from "@react-navigation/native";
import { ColorSchemeName, Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WebViewPage from "../screens/DroneWorks/WebViewPage";
import MapPage from "../screens/DroneWorks/MapPage";
import LocationSearchPage from "../screens/DroneWorks/LocationSearchPage";
import StoreSearchPage from "../screens/DroneWorks/StoreSearchPage";

const Stack = createNativeStackNavigator();

export default function DroneWorksNav({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Map"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="Map"
        options={{
          headerShown: false,
        }}
        component={MapPage}
      />
      <Stack.Screen
        name="LocationSearch"
        options={{
          headerShown: false,
        }}
        component={LocationSearchPage}
      />
      <Stack.Screen
        name="StoreSearch"
        options={{
          headerShown: false,
        }}
        component={StoreSearchPage}
      />
      <Stack.Screen
        name="WebView"
        options={{
          headerShown: false,
        }}
        component={WebViewPage}
      />
    </Stack.Navigator>
  );
}
