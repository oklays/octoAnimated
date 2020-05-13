import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default (props) => {
  const { children, stylesProps } = props;
  return <View style={[styles.container, stylesProps]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
