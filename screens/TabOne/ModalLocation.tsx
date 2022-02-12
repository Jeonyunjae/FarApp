import { NativeStackScreenProps } from "react-native-screens/native-stack";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Alert, Modal, StyleSheet, Text, Pressable, Dimensions, Platform, View, Button } from "react-native";
import { useState, useEffect } from "react";
import * as Location from 'expo-location';
import styled from "styled-components/native";
import Constants from 'expo-constants';
import MapView, { Callout, Marker } from 'react-native-maps';
export default function ModalLocation( props : any) {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      console.log(location)
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        props.setModalVisible(!props.modalVisible);
      }}
    >
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <MapView
            style={mapStyles.map}
            initialRegion={{
              latitude: location?.coords?.latitude || 0,
              longitude: location?.coords?.longitude || 0,
              latitudeDelta: 0.045,
              longitudeDelta: 0.045,
            }}
            region={{
              latitude: location?.coords?.latitude || 0,
              longitude: location?.coords?.longitude || 0,
              latitudeDelta: 0.045,
              longitudeDelta: 0.045,
            }}
            camera={{
              center: {
                latitude: location?.coords?.latitude || 0,
                longitude: location?.coords?.longitude || 0,
              },
              heading: 1,
              pitch: 1,
              zoom: 1,
              altitude: 1,
            }}
            showsCompass={true}
            rotateEnabled={false}
            showsTraffic={true}
            showsMyLocationButton={true}
            //애플지도에 비해 느림거 같음
            //provider="google"
          >
            <Marker
              coordinate={{
                latitude: location?.coords?.latitude || 0,
                longitude: location?.coords?.longitude || 0,
              }}
              pinColor="blue"
            >
              <Callout>
                <Text>here</Text>
              </Callout>
            </Marker>
          </MapView>
        </View>
      </View>
    </Modal>
  );
}
const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width*0.90,
    height: Dimensions.get('window').height*0.80,
    borderRadius: 20,
  },
});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.8,
    marginBottom: Dimensions.get("window").height * 0.1,
    marginTop: Dimensions.get("window").height * 0.1,
    marginLeft: Dimensions.get("window").width * 0.05,
    marginRight: Dimensions.get("window").width * 0.05,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flex: 1,
    width: Dimensions.get("window").width * 0.9,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  heading: {
    color: "white",
    fontSize: 22,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});
