import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  Image,
  Modal,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Slider from "@react-native-community/slider";
import styled from "styled-components/native";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useRef, useState } from "react";
import { Gyroscope } from "expo-sensors";
import { gql } from "@apollo/client";
import { FEED_PHOTO } from "../../fragments";

const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      ...FeedPhoto
    }
  }
  ${FEED_PHOTO}
`;

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  top: 80%;
  left: 140px;
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;

export default function CameraPage({ navigation }: any) {
  const camera = useRef<Camera>();
  const [takenPhoto, setTakenPhoto] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [ok, setOk] = useState(false);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const getPermissions = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync();
    setOk(granted);
  };
  useEffect(() => {
    getPermissions();
  }, []);
  
  const onCameraReady = () => setCameraReady(true);
  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const { uri } = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      setTakenPhoto(uri);
      setCameraReady(false);

      //1. 

      //navigation.navigate('Search', { uri: uri})
      // local 저장
      // const asset = await MediaLibrary.createAssetAsync(uri);
    }
  };
  const setTakenPhotoRemove = () => {
    setTakenPhoto("");
  }
  const isFocused = useIsFocused();
  return (
    <Container>
      {isFocused ? <StatusBar hidden={true} /> : null}
      <Camera
        type={cameraType}
        style={{ flex: 1 }}
        zoom={zoom}
        flashMode={flashMode}
        ref={camera}
        onCameraReady={onCameraReady}
      >
        {takenPhoto === "" ? (
          <TakePhotoBtn onPress={takePhoto} />
        ) : (
          <View>
            <CloseButton onPress={setTakenPhotoRemove}>
              <Ionicons name="close" color="white" size={30} />
            </CloseButton>
          </View>
        )}
      </Camera>
    </Container>
  );
}
