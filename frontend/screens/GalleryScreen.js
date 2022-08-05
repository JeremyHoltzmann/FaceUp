import { View, Image } from "react-native";
import { Card, Chip, Badge } from "react-native-elements";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { connect } from "react-redux";

const GalleryScreen = (props) => {
  var cardList = props.imagesUrl.map((element, i) => {
    var properties = Object.keys(element.resultDetection.detectedFaces[0]).map(
      (propElement, j) => {
        return (
          <Badge
            key={j}
            status="success"
            value={element.resultDetection.detectedFaces[0][propElement]}
          />
        );
      }
    );

    return (
      <Card key={i}>
        <Card.Image
          style={{ width: "100%", height: 170, marginBottom: 10 }}
          source={{ uri: element.resultCloudinary.secure_url }}
        />
        {properties}
      </Card>
    );
  });
  console.log(
    "🚀 ~ file: GalleryScreen.js ~ line 26 ~ cardList ~ cardList",
    cardList
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{
          flex: 1,
          margin: 0,
          padding: 0,
        }}
      >
        {cardList}
      </ScrollView>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return { imagesUrl: state.imagesUrl };
}
export default connect(mapStateToProps, null)(GalleryScreen);
