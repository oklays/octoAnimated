import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "constants/globalStyles";

import CustomContainer from "components/CustomContainer";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

const IconButtonProps = [
  {
    icon: "play",
    isSelected: false,
    value: 1,
  },
  {
    icon: "stop",
    isSelected: false,
    value: 0,
  },
  {
    icon: "undo",
    isSelected: false,
    value: 0,
  },
];

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputRangeValue: 1,
      springValue: new Animated.Value(1),
    };
    this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.spin();
  }
  
  spin() {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
    }).start(() => this.spin());
  }

  animation() {
    let { springValue } = this.state;
    Animated.spring(springValue, {
      toValue: 1.5,
      friction: 3,
      stretch: 100,
    }).start();
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, this.state.inputRangeValue],
      outputRange: ["0deg", "360deg"],
    });

    return (
      <CustomContainer stylesProps={styles.container}>
        <Text
          style={{
            ...globalStyles.textBoldXlarge,
            alignSelf: "center",
            marginTop: 30,
          }}
        >
          React Native Animated
        </Text>
        <Animated.Image
          source={require("assets/images/logo.png")}
          style={{
            alignSelf: "center",
            width: 200,
            height: 200,
            transform: [{ rotate: spin }],
          }}
        />

        {/* Button Container */}
        <View style={styles.btnContainer}>
          {IconButtonProps.map((item) => (
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.setState({ inputRangeValue: item.value })}
            >
              <FontAwesome name={item.icon} size={16} color="#fff" />
            </TouchableOpacity>
          ))}
        </View>
        {/* End Button Container */}
        <Text>{JSON.stringify(this.state, null, 2)}</Text>
      </CustomContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  btnContainer: {
    backgroundColor: "#3792cb",
    padding: 20,
    borderRadius: 7,
    marginHorizontal: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonStyle: {
    marginHorizontal: 20,
  },
});
