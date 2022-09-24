import * as React from "react";
import MapView, { Marker, Region } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import Constants from "expo-constants";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import SwipeContainer from "../components/ui/SwipeContainer";
import { Modalize } from "react-native-modalize";

export default function MapPage({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const [location, setLocation] = useState<Region>();
  const [errorMsg, setErrorMsg] = useState("");
  const modalizeRef = useRef<Modalize>(null);
  const [handle, setHandle] = useState(false);

  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require("../../assets/images/logo.png")];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  };

  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0222;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Constants.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const onRegionChange = (props: any) => {
    setLocation({
      latitude: props.latitude,
      longitude: props.longitude,
      latitudeDelta: props.latitudeDelta,
      longitudeDelta: props.longitudeDelta,
    });
  };
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const handlePosition = (position:any) => {
    setHandle(position === 'top');
  };
  const preload = async () => {
    let curLocation = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: curLocation.coords.latitude,
      longitude: curLocation.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
    //return preloadAssets();
  };

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.latitude || 0,
          longitude: location?.longitude || 0,
          latitudeDelta: location?.latitudeDelta || 0,
          longitudeDelta: location?.longitudeDelta || 0,
        }}
        region={location}
        onRegionChange={onRegionChange}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="현재위치"
          image={require("../../assets/images/gps.png")}
          description="위치 확인 후 눌러주세요"
          onCalloutPress={() => navigation.navigate("Search", location)}
        ></Marker>
      </MapView>
      <TouchableOpacity onPress={onOpen}>
        <Text>Open the modal</Text>
      </TouchableOpacity>

      <Modalize
        ref={modalizeRef}
        handleStyle={{
          top: 43,
          width: 40,
          height: handle ? 600 : 100,
          backgroundColor: "#bcc0c1",
        }}
        onPositionChange={handlePosition}
      >
        ...your content
      </Modalize>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
