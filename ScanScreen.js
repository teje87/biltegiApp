'use strict';

import React, { Component } from 'react';
import Modal from "react-native-modal";
import Icon, { Button } from 'react-native-vector-icons/dist/FontAwesome';
import {RkButton,RkText, RkTextInput, RkCard, RkPicker} from 'react-native-ui-kitten';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { withNavigationFocus, NavigationEvents } from "react-navigation";
import Toast, {DURATION} from 'react-native-easy-toast'

import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  Vibration,
  Text
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class ScanScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      animation: require("./res/succedGreen.json"),
      succed: false,
      pickedValue: "",
      pikerVisible: true,
      isModalVisible: false,
      date: "",
      time: "",
      referencia:"",
      sulfatante:"",
      lote : "",
      loteFilm : "",
      operario:"",
      productionsParameters:{
        lote:"59798",
        loteFilm:"846127"
      }
    }
  }

  
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });
  
  toggleResultAnim = () => {
    this.setState({ succed: !this.state.succed })
  }



  // Post record to the db and display animation
  _confirm = ()=> 
    axios.post('http://192.168.0.157:8000/api',  this.state)
          .then((response) =>  { 
                              this.setState({animation : require("./res/succedGreen.json")})
                              Vibration.vibrate([200,200])
                              this._toggleModal()
                              this.toggleResultAnim()
                              setTimeout(()=>{this.toggleResultAnim()}, 2000)}) 
          .catch((error) => { 
                              this.setState({animation : require("./res/failRed.json")})
                              this.toggleResultAnim()
                              setTimeout(()=>{this.toggleResultAnim()}, 2000) 
                              console.warn(error.request._response)})

  getDate = () => {
    let date = new Date()
    
    //DATE
    let day = date.getDate()
    let month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    let year = date.getFullYear()
    
    //TIME
    var seconds = (date.getSeconds()  < 10 ? '0' : '') + (date.getSeconds());
    var minutes = (date.getMinutes()  < 10 ? '0' : '') + (date.getMinutes() );
    var hour =(date.getHours()  < 10 ? '0' : '') + (date.getHours());

    let formatTime = hour + ":" + minutes + ":" + seconds
    let formatDate = year + " - " + month + " - " + day
    
    
    this.setState({
      date: formatDate.toString(),
      time: formatTime.toString()}
    )
  }

  
  matchParameters(){
    if(this.state.lote == this.state.productionsParameters.lote && this.state.loteFilm == this.state.productionsParameters.loteFilm){
      return true
    }else{
      return false
    }
  }

  notMatchAlert(){
    this.refs.toast.show(
      <View style={{flex:1}}>
        <RkCard>
          <View rkCardHeader>
            <Text>ALERTA</Text>
          </View>
          <View rkCardImg>
            <LottieView
                            source={require("./res/1174-warning.json")}
                            
                            autoPlay
                            loop = {false}/>
          </View>
          <View rkCardContent>
            <Text> La lectura de bobina no corresponde al lote actual ({this.state.productionsParameters.lote})</Text>
          </View>
        </RkCard>
      </View>
      , 5000, ()=> this._toggleModal())
    
    
    
  }

  onSuccess(e) {
    this.getDate()
    this.setState(
      { 
        /* referencia: e.data.split(" ")[0] ,
        sulfatante: e.data.split(" ")[2] , */
        lote:e.data.split(" ")[0] ,
        loteFilm: e.data.split(" ")[1],
        /* caducidad: e.data.split(" ")[5], */
        bobina: e.data.split(" ")[3],
        linea: e.data.split(" ")[6]
      }, ()=> {this.matchParameters() ? this._toggleModal() : this.notMatchAlert() }) 
    
    
  }

  render() {

    return (

      <View>

      

      <NavigationEvents
          onWillFocus={() => {
            this.setState({reactivate: true})
              }}
              />
              
        <QRCodeScanner
          reactivate={this.state.reactivate}
          ref={(node) => { this.scanner = node }}
          reactivateTimeout= {4000}
          cameraProps={{captureAudio: false}}
          onRead={this.onSuccess.bind(this)}
          bottomContent={
            <View>

              <Toast
                    ref="toast"
                    position='top'
                    style={{width:300, backgroundColor:"white"}}
                    positionValue={5}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                />

              <Modal  isVisible= {this.state.succed}
                      onBackdropPress={() => this.setState({ succed: false })}>
                      <View style={{ flex: 1 }}>
                        <LottieView
                          source={this.state.animation}
                          resizeMode = "cover"
                          autoPlay
                          loop = {false}/>
                    </View>
              </Modal>
              
              
              <Modal  isVisible= {this.state.isModalVisible}>
                <ScrollView style={{ flex: 1, alignContent: "center", borderRadius:10 }}>
                  <RkCard style= {{ flex: 1, alignItems: "center", borderRadius:10}}>                  
                    
                    <View rkCardHeader>
                      <Icon name="check" size={50} color="green" />
                    </View>
                    
                    <RkTextInput 
                      rkType = {"form"}
                      value = { this.state.date}
                      onChangeText={(text) => this.setState({date: text})}
                      placeholder='Fecha'/>
                    <RkTextInput 
                      rkType = {"form"}
                      value = {this.state.time}
                      onChangeText={(text) => this.setState({time: text})}
                      placeholder='Hora'/>
                    <RkTextInput 
                      rkType= {"form"}
                      value= {this.state.referencia}
                      onChangeText={(text) => this.setState({referencia: text})}
                      placeholder='referencia'/>
                    <RkTextInput 
                      rkType= {"form"}
                      value= {this.state.sulfatante}
                      onChangeText={(text) => this.setState({sulfatante: text})}
                      placeholder='sulfatante'/>
                    <RkTextInput 
                      rkType= {"form"}
                      value= {this.state.lote}
                      onChangeText={(text) => this.setState({lote: text})}
                      placeholder='Lote'/>
                    <RkTextInput 
                      rkType = {"form"}
                      value= {this.state.loteFilm}
                      onChangeText={(text) => this.setState({loteFilm: text})}
                      placeholder='Lote Film'/>
                    <RkTextInput 
                      rkType = {"form"}
                      value= {this.state.caducidad}
                      onChangeText={(text) => this.setState({caducidad: text})}
                      placeholder='Fecha de caducidad'/>
                    <RkTextInput 
                      rkType = {"form"}
                      value= {this.state.bobina}
                      onChangeText={(text) => this.setState({bobina: text})}
                      placeholder='Bobina'/>
                    <RkTextInput 
                      rkType = {"form"}
                      value= {this.state.linea}
                      onChangeText={(text) => this.setState({linea: text})}
                      placeholder='Linea'/>
                    <RkTextInput 
                      rkType = {"form"}
                      onChangeText={(text) => this.setState({operario: text})}
                      placeholder='Operario'/>

                  <View rkCardFooter>
                    <RkButton onPress={this._toggleModal} >Cancelar</RkButton>
                    <RkButton onPress={this._confirm}  rkType= {"success"}>Registrar</RkButton>
                  </View>

                </RkCard>
                </ScrollView>
        </Modal>

            </View>

            
          }
          bottomViewStyle={styles.bottomContainer}

        />
        </View>
    );
  }
}


const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  bottomContainer: {
    height:700,
    backgroundColor: "white"
  },
  mainContainer:{
    flex:1
  },
  cameraContainer:{
    height:20
  }
});

AppRegistry.registerComponent('default', () => ScanScreen);

