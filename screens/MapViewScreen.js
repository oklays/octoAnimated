import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from "react-native";
import { globalStyles } from "constants/globalStyles";
import Icon from "react-native-vector-icons/FontAwesome5";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import MapMarkerLogo from "../assets/icons/map_location.svg";

import CustomContainer from "components/CustomContainer";

export default class MapViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: 107.0277504,
      latitude: -6.2491232,
      markers: [
        {
          id: "01",
          title: "Kantor Pegawai 1",
          coordinates: {
            latitude: -6.2491232,
            longitude: 107.0277504,
          },
        },
        {
          id: "02",
          title: "Kantor Pegawai 2",
          coordinates: {
            latitude: -6.2495434,
            longitude: 107.0277504,
          },
        },
        {
          id: "03",
          title: "Kantor Pegawai 3",
          coordinates: {
            latitude: -6.2499545,
            longitude: 107.0265504,
          },
        },
      ],
    };
  }

  animation = new Animated.Value(0);

  toggleMenu = () => {
    const toValue = this.open ? 0 : 1;

    Animated.spring(this.animation, {
      toValue,
      friction: 5,
    }).start();

    this.open = !this.open;
  };

  render() {
    const pinStyle = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -80],
          }),
        },
      ],
    };

    const thumbStyle = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -140],
          }),
        },
      ],
    };

    const heartStyle = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -200],
          }),
        },
      ],
    };

    const rotation = {
      transform: [
        {
          rotate: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "45deg"],
          }),
        },
      ],
    };

    const opacity = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    });

    return (
      <CustomContainer stylesProps={styles.container}>
        {/* MapView */}
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
        >
          {this.state.markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinates}
              title={marker.title}
              // description={this.state.markers.title}
            >
              <MapMarkerLogo width={40} height={40} />
              <Text style={globalStyles.textSmall}>{marker.title}</Text>
            </Marker>
          ))}
        </MapView>
        {/* End MapView */}

        <TouchableWithoutFeedback>
          <Animated.View
            style={[styles.button, styles.secondary, heartStyle, opacity]}
          >
            <Icon name="heart" size={18} color="#F02A4B" />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <Animated.View
            style={[styles.button, styles.secondary, thumbStyle, opacity]}
          >
            <Icon name="thumbs-up" size={18} color="#F02A4B" />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <Animated.View
            style={[styles.button, styles.secondary, pinStyle, opacity]}
          >
            <Icon name="map" size={18} color="#F02A4B" />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.toggleMenu}>
          <Animated.View style={[styles.button, styles.menu, rotation]}>
            <Icon name="plus" size={18} color="#fff" />
          </Animated.View>
        </TouchableWithoutFeedback>
      </CustomContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#F02A4B",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    bottom: 0,
  },
  menu: {
    backgroundColor: "#F02A4B",
  },
  secondary: {
    width: 48,
    height: 48,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
