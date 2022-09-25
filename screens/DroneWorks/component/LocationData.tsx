import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import Constants from "expo-constants";
import AppLoading from "expo-app-loading";
import axiosClient from "../../../axios";

export default function LocationData({ navigation, location }: any) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const onFinish = () => setLoading(false);
  
  const params = {
    Usercode: `0`,
    Loclatitude: location.latitude,
    Loclongtitude: location.longtitude,
    Distance: 0,
    Count: 100,
  };
  const preload = async () => {
    setLoading(true);
    await axiosClient
      .post("/PositionAddressInfoReadsLimit", JSON.stringify(params))
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.error(err)
        console.log(JSON.stringify(err))
      })
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
  return <View style={styles.container}></View>;
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
