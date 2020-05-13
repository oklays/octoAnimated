import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default (props) => {
  const { children } = props;
  return <View style={styles.body}>{children}</View>;
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});
