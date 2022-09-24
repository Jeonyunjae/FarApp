
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { ColorSchemeName, Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/Login/Welcome";
import Login from "../screens/Login/Login";
import CreateAccount from "../screens/Login/CreateAccount";
import CameraPage from "../screens/DroneWorks/CameraPage";
import SearchPage from "../screens/DroneWorks/SearchPage";
import WebViewPage from "../screens/DroneWorks/WebViewPage";
import MapPage from "../screens/DroneWorks/MapPage";

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
      <Stack.Screen name="Search" component={SearchPage} />
      <Stack.Screen name="WebView" component={WebViewPage} />
    </Stack.Navigator>
  );
}
