import { Ionicons } from "@expo/vector-icons";
import useColorScheme from "../../hooks/useColorScheme";
import {
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Header as HeaderRNE, HeaderProps, Icon } from "react-native-elements";
import { useState } from "react";
import ModalLocation from "../TabOne/ModalLocation";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";

export default function TabOne_One() {
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  
  return (
    <View>
      <HeaderRNE
        backgroundColor="white"
        rightComponent={
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons
                name="map-outline"
                size={25}
                backgroundColor=""
              />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{ text: "Market", style: styles.heading }}
      />
      <ModalLocation
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      >
        
      </ModalLocation>
    </View>
  );
}

const styles = StyleSheet.create({  
  headerRight: {
    display: "flex",
    flexDirection: "row",
    marginRight: 5,
  },
  heading: {
    color: "black",
    fontSize: 22,
  }
});
