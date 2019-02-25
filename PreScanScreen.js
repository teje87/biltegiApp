import React from "react";
import { View, Text, AppRegistry, Button } from "react-native";
import ScanScreen from "./ScanScreen";

export default class PreScanScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Button
          title="Go to ScanScreen"
          onPress={() => this.props.navigation.navigate('Scan')}
        />
        </View>
      );
    }
  }
  

  AppRegistry.registerComponent('default', () => PreScanScreen);
