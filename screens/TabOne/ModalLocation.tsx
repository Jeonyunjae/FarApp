import { NativeStackScreenProps } from "react-native-screens/native-stack";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Alert, Modal, StyleSheet, Text, Pressable, Dimensions, View } from "react-native";
import { useState } from "react";
import styled from "styled-components/native";

export default function ModalLocation( props : any) {
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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => props.setModalVisible(!props.modalVisible)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
          
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create(
  {
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      width: Dimensions.get('window').width*0.90,
      height: Dimensions.get('window').height*0.90,
      marginBottom: Dimensions.get('window').height*0.05,
      marginTop: Dimensions.get('window').height*0.05,
      marginLeft: Dimensions.get('window').width*0.05,
      marginRight: Dimensions.get('window').width*0.05,
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      flex: 1,
      width: Dimensions.get('window').width*0.90,
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
      textAlign: "center"
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
  });
