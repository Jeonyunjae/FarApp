import Constants from "expo-constants";
import React, { Component, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  Dimensions,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { Modalize } from "react-native-modalize";
import * as Location from "expo-location";
import AppLoading from "expo-app-loading";
import AlwaysOpen from "./component/AlwaysOpen";
import { Divider } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";

export default function MapPage({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const [location, setLocation] = useState<Region>();
  const [errorMsg, setErrorMsg] = useState("");
  const modalizeRef = useRef<Modalize>(null);
  const [handle, setHandle] = useState(false);

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

  const handlePosition = (position: any) => {
    setHandle(position === "top");
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
      <View style={styles.mapViewStack}>
        <MapView
          initialRegion={{
            latitude: location?.latitude || 0,
            longitude: location?.longitude || 0,
            latitudeDelta: location?.latitudeDelta || 0,
            longitudeDelta: location?.longitudeDelta || 0,
          }}
          region={location}
          onRegionChange={onRegionChange}
          style={styles.mapView}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="현재위치"
            image={require("../../assets/images/gps.png")}
            description="위치 확인 후 눌러주세요"
            // onCalloutPress={() => navigation.navigate("Search", location)}
          ></Marker>
        </MapView>

        <Modalize
          ref={modalizeRef}
          modalStyle={s.content__modal}
          alwaysOpen={115}
          handlePosition="inside"
          disableScrollIfPossible={false}
        >
          <View style={s.location_total}>
            <View style={s.location_group}>
              <View style={s.location_main}>
                <View style={s.location_inn}>
                  <View style={s.content}>
                    <Text style={s.content__subheading}>{"Latitude"}</Text>
                    <Text style={s.content__heading}>{location.latitude}</Text>
                  </View>
                </View>
              </View>
              <View style={s.location_main}>
                <View style={s.location_inn}>
                  <View style={s.content}>
                    <Text style={s.content__subheading}>{"Longitude"}</Text>
                    <Text style={s.content__heading}>{location.longitude}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={s.location_list}>
            </View>
          </View>
        </Modalize>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    position: "absolute",
    top: 0,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    left: 0,
  },
  button: {
    top: Dimensions.get("window").height * 0.9,
    left: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 10,
    position: "absolute",
    backgroundColor: "rgba(230,230,230,0.61)",
  },
  latlon: {
    color: "#121212",
    marginTop: 33,
    marginLeft: 157,
  },
  mapViewStack: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
const s = StyleSheet.create({
  content: {
    paddingLeft: 15,
    paddingTop: 10,
  },
  location_total: {
    flexDirection: "column", // 혹은 'column'
  },
  location_group: {
    flexDirection: "row", // 혹은 'column'
  },
  location_list: {
    borderRadius: 15,
    backgroundColor: "#30CE88",
    height: Dimensions.get("window").height*0.7,
    width: Dimensions.get("window").width * 0.92,
    left: Dimensions.get("window").width * 0.04,
  },
  location_main: {
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").width * 0.4,
  },
  location_inn: {
    backgroundColor: "#30CE88",
    width: Dimensions.get("window").width * 0.42,
    left: Dimensions.get("window").width * 0.04,
    height: Dimensions.get("window").width * 0.3,
    top: Dimensions.get("window").width * 0.05,
    borderRadius: 15,
  },

  content__modal: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.7,
  },

  content__subheading: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 15,
    fontWeight: "600",
    color: "#FFF",
  },

  content__heading: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "600",
    color: "#FFF",
  },

  content__description: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 15,
    fontWeight: "200",
    lineHeight: 22,
    color: "#666",
  },
});
