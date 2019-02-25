import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import ScanScreen from "./ScanScreen";
import PreScanScreen from "./PreScanScreen"

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const PreScanStack = createStackNavigator({
    PreScan: PreScanScreen,
    Scan: ScanScreen
})

const AppNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  PreScan: PreScanStack,
});

export default createAppContainer(AppNavigator);