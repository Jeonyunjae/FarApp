import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";

export default function LocationFlatlist({ navigation, route, data }: any) {
  const [selectedId, setSelectedId] = useState(null);
  const Item = ({ item }: any) => (
    <TouchableOpacity onPress={() => {
      navigation.navigate("WebView", item.Usercode)
    }}>
      <View style={styles.item_main}>
        <View style={styles.item_group}>
          <View style={styles.item_avator}>
            <Image
              style={styles.item_avator}
              source={require("../../../assets/images/logo.png")}
            />
          </View>
          <View style={styles.item_info}>
            <Text style={styles.title}>{item.Usercode}</Text>
            <Text style={styles.item}>
              Latitude : {item.Loclatitude.toFixed(6)}
            </Text>
            <Text style={styles.item}>
              Longitude : {item.Loclongtitude.toFixed(8)}
            </Text>
            <Text style={styles.item}>
              Distance : {item.Distance.toFixed()}m
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  const renderItem = ({ item }: any) => (
    <Item item={item} />
  );

  return (
    <FlatList
      style={styles.flatlist}
      data={data}
      renderItem={renderItem}
      extraData={selectedId}
    />
  );
}

const styles = StyleSheet.create({
  flatlist: {
    paddingTop: 10,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  location_group: {
    flexDirection: "row", // 혹은 'column'
  },
  item_group: {
    flexDirection: "row", // 혹은 'column'
  },
  item_avator: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
  item_main: {
    borderRadius: 15,
    backgroundColor: "#05BE70",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  item_info: {
    left: 20,
    top: 20,
  },
  title: {
    bottom: 5,
    fontSize: 18,
    color: "#FFF",
    fontWeight: "600",
  },
  item: {
    fontSize: 12,
    color: "#FFF",
    fontWeight: "600",
  },
});
