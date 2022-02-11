import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Header as HeaderRNE, HeaderProps, Icon } from "react-native-elements";
import { useState } from "react";
import ModalLocation from "../TabOne/ModalLocation";
import { Text, View } from "../../components/Themed";

export default function TabOne_One() {
  const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <View>
      <HeaderRNE
        rightComponent={
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons name="menu" color="white" />
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
    marginTop: 5,
  },
  heading: {
    color: "white",
    fontSize: 22,
  },
});
