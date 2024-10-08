import React, { useState, useEffect, useRef, useContext } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Constants from "expo-constants";
import { Camera, CameraView } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { CameraButton } from "../ui/CameraButton";
import { useNavigation } from "@react-navigation/native";
import { FormContext } from "../../contexts/FormContext";
import { useUpdateObj } from "../../hooks/useUpdateObj";

export const CameraManager = ({ route }) => {
  const navigation = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState("back");
  const [flash, setFlash] = useState("off");
  const [base64Image, setBase64Image] = useState("");
  const cameraRef = useRef(null);
  const { setFormData } = useContext(FormContext);
  const [updateObj] = useUpdateObj(setFormData);

  const { path, photoType = null } = route.params;

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (photoType) {
      setType(photoType);
    }
  }, [photoType]);

  const addImage = () => {
    updateObj(path, base64Image);
  };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 0.2,
        });
        setBase64Image(data.base64);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        addImage();
        setImage(null);
        setBase64Image("");
        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <CameraView
          style={styles.camera}
          facing={type}
          ref={cameraRef}
          flash={flash}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
            <CameraButton
              title=""
              icon="retweet"
              onPress={() => {
                setType(type === "back" ? "front" : "back");
              }}
            />
            <CameraButton
              onPress={() => {
                flash === "off" ? setFlash("on") : setFlash("off");
              }}
              icon="flash"
              color={flash === "off" ? "gray" : "#fff"}
            />
          </View>
        </CameraView>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

      <View style={styles.controls}>
        {image ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
            }}
          >
            <CameraButton
              title="Re-take"
              onPress={() => setImage(null)}
              icon="retweet"
            />
            <CameraButton title="Save" onPress={savePicture} icon="check" />
          </View>
        ) : (
          <CameraButton
            title="Take a picture"
            onPress={takePicture}
            icon="camera"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#000",
    padding: 8,
  },
  controls: {
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#E9730F",
    marginLeft: 10,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
});
