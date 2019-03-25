import React from "react";
import { View, Text, AppRegistry, Button } from "react-native";
import {Avatar} from 'react-native-elements';
import ScanScreen from "./ScanScreen";

export default class PreScanScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

          <Avatar
            size="xlarge"
            rounded
            icon={{name: 'camera', type: 'font-awesome'}}
            onPress={() => this.props.navigation.navigate('Scan')}
            activeOpacity={0.7}
          />  

        </View>
      );
    }
  }
  

  AppRegistry.registerComponent('default', () => PreScanScreen);
