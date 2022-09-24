import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import AppLoading from "expo-app-loading";
import axios from "axios";
import axiosClient from "../../axios";

export default function SearchPage({ navigation, route }: any) {
  const [loading, setLoading] = useState(false);

  const onFinish = () => setLoading(false);
  // const preload = async () => {
  //   setLoading(true);
  //   console.log(1234)
  //   fetch('https://127.0.0.1:3000/api/PositionAddressInfoReadsLimit', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       Usercode: 0,
  //       Loclatitude: route.params.latitude,
  //       Loclongtitude: route.params.longitude,
  //       Distance: 0,
  //       Count: 100,
  //     }),
  //   })
  //   .then((response) => {
  //     //setLoading(false)
  //     response.text();
  //   })
  //   .then((result) => console.log("11"+result))
  //   .catch((error) => console.log("22"+error));
  // };
  const params = {
    Usercode: `0`,
    Loclatitude: route.params.latitude,
    Loclongtitude: route.params.longtitude,
    Distance: 0,
    Count: 100,
  };
  const preload = async () => {
    setLoading(true);

    console.log(1111);
    const api = "http://localhost:3000/api/PositionAddressInfoReadsLimit";

    //const api_test = 'http://localhost:3000/api';

    // var resp = await axios.get(api_test)
    //                       .catch(function(error){
    //                           console.log("111111"+JSON.stringify(error))
    //                       });;
    //console.log(resp)

    await axiosClient
      .post("/PositionAddressInfoReadsLimit", JSON.stringify(params))
      .then((res) => {
        console.log(res)
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
