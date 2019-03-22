import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createStackNavigator, createAppContainer, NavigationEvents } from "react-navigation";
import axios from 'axios';
import {ListItem, Header, Button} from 'react-native-elements';
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
      axios.get('http://192.168.0.157:8000/api/labelling').then((labellingRecords) => this.setState({labellingRecords: labellingRecords.data}))
  }
  
  componentWillMount(){
    this.getLabelRecords()
  }
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'biltegiApp', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}/>

        <Button
          icon={{
            name: "arrow-right",
            size: 15,
            color: "white"
          }}
          title="Log records"
          onPress={()=> console.warn(this.state.labellingRecords)}
        />


        {this.state.labellingRecords.map( (record,i) => {
          return(
            <ListItem
              key={i}
              title={record.referencia}
              topDivider
              bottomDivider
            />
            )})} 
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