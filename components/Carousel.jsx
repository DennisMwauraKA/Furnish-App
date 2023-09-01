import { StyleSheet, View, Dimensions } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
const Carousel = () => {
  const { width } = Dimensions.get("window");
  const slides = [
    "https://images.pexels.com/photos/6585751/pexels-photo-6585751.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://media.istockphoto.com/id/1082558378/photo/modern-streamlined-mirror-copper-chandelier-bubble-metal-copper-shade-pendant.jpg?s=612x612&w=0&k=20&c=LB-OlMtalo-KAwPfxiEyIPmtwe6ffr23jjU2NE20pcY=",
    "https://media.istockphoto.com/id/519463606/photo/grey-sofa-with-pillows.jpg?s=612x612&w=0&k=20&c=2qpbPoMCyM7Ztkea0j5RboRqbntLkMdND1qxVHQrZks=",
    "https://images.pexels.com/photos/13806260/pexels-photo-13806260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];
  return (
    <View style={styles.container}>
      <SliderBox
        images={slides}
        dotColor={"orange"}
        ImageComponentStyle={{
          borderRadius: 15,
          resizeMode: "cover",
          width: width * 0.9,
          marginTop: 15,
        }}
        autoplay
        circleLoop
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
