import { View, Text } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";

import { Camera } from "expo-camera";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import { Entypo } from "@expo/vector-icons";
import { Icon, Button, Overlay } from "react-native-elements";

import { connect } from "react-redux";

export function SnapScreen(props) {
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [torch, setTorch] = useState(Camera.Constants.FlashMode.off);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  var cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission) {
    return (
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <Camera
          style={{ flex: 1 }}
          type={type}
          flashMode={torch}
          ref={(ref) => (cameraRef = ref)}
        ></Camera>
        <View
          style={{
            flex: 1,
            position: "absolute",
            bottom: 0,
            alignSelf: "stretch",
          }}
        >
          <View
            style={{
              alignSelf: "stretch",
              flex: 1,
              flexDirection: "row",
              backgroundColor: "transparent",
              elevation: 100,
            }}
          >
            <Button
              buttonStyle={{ backgroundColor: "transparent" }}
              title="Flip"
              icon={
                <MaterialIcon name="flip-camera-ios" size={15} color="white" />
              }
              iconPosition="top"
              onPress={() => {
                setType(
                  type == Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            ></Button>
            <Button
              icon={<Entypo name="flash" size={15} color="white" />}
              iconPosition="top"
              buttonStyle={{ backgroundColor: "transparent" }}
              title="Flash"
              onPress={() => {
                console.log(torch);
                setTorch(
                  torch == Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.torch
                    : Camera.Constants.FlashMode.off
                );
              }}
            ></Button>
          </View>
          <Button
            buttonStyle={{
              alignSelf: "stretch",
              height: 40,
              backgroundColor: "#159588",
              padding: 0,
            }}
            title="Snap"
            icon={<AntDesign name="save" size={15} color="white" />}
            onPress={async () => {
              if (cameraRef) {
                setIsOverlayVisible(true);
                let photo = await cameraRef.takePictureAsync();
                console.log(
                  "🚀 ~ file: SnapScreen.js ~ line 94 ~ onPress={ ~ photo",
                  photo
                );

                var data = new FormData();

                data.append("photo", {
                  uri: photo.uri,
                  type: "image/jpeg",
                  name: "user_avatar.jpg",
                  width: photo.width,
                  height: photo.height,
                });

                fetch("http://192.168.10.121:3000/users/signUp", {
                  method: "post",
                  body: data,
                })
                  .then((response) => response.json())
                  .then((data) => {
                    props.setImageUrl(data);
                    setIsOverlayVisible(false);
                  });
              }
            }}
          />
        </View>
        <Overlay isVisible={isOverlayVisible}>
          <Text>Loading ...</Text>
        </Overlay>
      </View>
    );
  } else {
    return <View style={{ flex: 1 }} />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setImageUrl: function (image) {
      dispatch({ type: "setImageUrl", image });
    },
  };
}

export default connect(null, mapDispatchToProps)(SnapScreen);
