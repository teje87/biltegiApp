import React from "react";
import { View, Text, RefreshControl } from "react-native";
import { createBottomTabNavigator, createStackNavigator, createAppContainer, NavigationEvents } from "react-navigation";
import axios from 'axios';
import {ListItem, Header, Button, Icon} from 'react-native-elements';
import ScanScreen from "./ScanScreen";
import PreScanScreen from "./PreScanScreen"
import { ScrollView } from "react-native-gesture-handler";


class HomeScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      labellingRecords: [],
      refreshing: false
    }
  }
  
  getLabelRecords = () => {
      axios.get('http://192.168.0.157:8000/api/labelling').then((labellingRecords) => this.setState({labellingRecords: labellingRecords.data, refreshing:false}))
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getLabelRecords()
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

      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>

       {/*  <Button
          icon={{
            name: "arrow-right",
            size: 15,
            color: "white"
          }}
          title="Log records"
          onPress={()=> console.warn(this.state.labellingRecords)}
        /> */}


        {this.state.labellingRecords.map( (record,i) => {
          return(
            <ListItem
              key={i}
              title={record.referencia}
              leftAvatar={{title: record.operario}}
              subtitle={
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between'}}>

                  <View>
                    <Text>{record.lote}</Text>
                    <Text>{record.lote_film} - {record.linea}</Text>
                    <Text></Text>
                  </View>

                  <View>
                    <Text>{record.fecha}</Text>
                    <Text>{record.hora}</Text>
                  </View>

                </View>
              }
              topDivider
              bottomDivider
            />
            )})} 
        </ScrollView>
      </View>
    );
  }
}

const PreScanStack = createStackNavigator({
    PreScan: PreScanScreen,
    Scan:ScanScreen,
})




const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel:"Registros",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="database" size={30} type='foundation' />
      )
    }
  },
  Scan:
  {
    screen: PreScanStack,
    navigationOptions: {
      tabBarLabel:"Scan",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="qrcode-scan" size={30} type='material-community' />
      )
    }
  }})


export default createAppContainer(AppNavigator);