import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import AppLoading from "expo-app-loading";
import axios from "axios";
import axiosClient from "../../axios";
import LocationFlatlist from "./component/LocationFlatlist";

export default function LocationSearchPage({ navigation, route }: any) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const onFinish = () => setLoading(false);

  const params = {
    Usercode: `0`,
    Loclatitude: route.params.latitude,
    Loclongtitude: route.params.longitude,
    Distance: 0,
    Count: 10,
  };
  const preload = async () => {
    setLoading(true);

    await axiosClient
      .post("/PositionAddressInfoReadsLimit", JSON.stringify(params))
      .then((res) => {
        console.log(res.data)
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
        console.log(JSON.stringify(err));
      });
  };

  if (!loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }
  return (
    <View style={s.location_total}>
      <View style={s.location_group}>
        <View style={s.location_main}>
          <View style={s.location_inn}>
            <View style={s.content}>
              <Text style={s.content__subheading}>{"Latitude"}</Text>
              <Text style={s.content__heading}>{route.params.latitude.toFixed(8)}</Text>
            </View>
          </View>
        </View>
        <View style={s.location_main}>
          <View style={s.location_inn}>
            <View style={s.content}>
              <Text style={s.content__subheading}>{"Longitude"}</Text>
              <Text style={s.content__heading}>{route.params.longitude.toFixed(9)}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={s.location_list}>
        <LocationFlatlist navigation={navigation} data={data} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    margin: 15,
    marginTop: 50,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
  },
});

const s = StyleSheet.create({
  content: {
    paddingLeft: 15,
    paddingTop: 10,
  },
  location_total: {
    top: 90,
    flexDirection: "column", // 혹은 'column'
  },
  location_group: {
    flexDirection: "row", // 혹은 'column'
  },
  location_list: {
    borderRadius: 15,
    backgroundColor: "#30CE88",
    height: Dimensions.get("window").height * 0.67,
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
    marginTop: 18,
    marginBottom: 5,
    fontSize: 15,
    fontWeight: "600",
    color: "#FFF",
  },

  content__heading: {
    marginTop: 20,
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
