import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import ScanScreen from "./ScanScreen";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Scan: ScanScreen
});

export default createAppContainer(AppNavigator);