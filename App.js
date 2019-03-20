import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createStackNavigator, createAppContainer, NavigationEvents } from "react-navigation";
import axios from 'axios';
import {RkCard} from "react-native-ui-kitten";
import ScanScreen from "./ScanScreen";
import PreScanScreen from "./PreScanScreen"


class HomeScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      labellingRecords: []
    }
  }
  
  getLabelRecords = () => {
      axios.get('http://192.168.0.157:8000/api/labelling').then((labellingRecords) => this.setState(labellingRecords))
  }
  
  componentWillMount(){
    this.getLabelRecords()
  }
  
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
          {this.state.labellingRecords.map((record)=> {
            return(
              <RkCard rkType='shadowed'>
                <View rkCardHeader>
                  <Text>Registro</Text>
                </View>
                <View rkCardContent>
                  <Text>---</Text>
                </View>
              </RkCard>
            )
          })} 
      </View>
    );
  }
}

const PreScanStack = createStackNavigator({
    PreScan: PreScanScreen,
    Scan:ScanScreen,
})




const AppNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  PreScan:PreScanStack,
  });


export default createAppContainer(AppNavigator);