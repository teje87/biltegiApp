'use strict';

import React, { Component } from 'react';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {RkButton,RkText, RkTextInput, RkCard, RkPicker} from 'react-native-ui-kitten';
import axios from 'axios';

import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class ScanScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      pickedValue: "",
      pikerVisible: true,
      isModalVisible: false,
      date: "",
      time: "",
      referencia:"",
      sulfatante:"",
      lote : "",
      loteFilm : "",
      operario:""
      
      
    }
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });
  

    // RESOLVER QUE EL MOVIL Y SERVER ESTEN EN LA MISMA RED!!!
  _confim = ()=> 
    axios.post('http://192.168.0.76:8000/api',  this.state)

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


  onSuccess(e) {
    this.getDate()
    this._toggleModal()
    this.setState(
      { 
        referencia: e.data.split(" ")[0] ,
        sulfatante: e.data.split(" ")[2] ,
        lote:e.data.split(" ")[3] ,
        loteFilm: e.data.split(" ")[4],
        caducidad: e.data.split(" ")[5],
        bobina: e.data.split(" ")[6],
        linea: e.data.split(" ")[7]
      })
  }

  render() {
    return (
        <QRCodeScanner
          reactivate={true}
          reactivateTimeout= {4000}
          onRead={this.onSuccess.bind(this)}
          cameraStyle={styles.cameraContainer}
          bottomContent={
            <View>
          
              
              <Modal isVisible= {this.state.isModalVisible}>
                <ScrollView style={{ flex: 1, alignContent: "center", borderRadius:10 }}>
                  <RkCard style= {{ flex: 1, alignItems: "center", borderRadius:10}}>
                  
                    <View rkCardHeader>
                      <Icon name="check" size={50} color="green" />
                    </View>

                    
                    <RkTextInput 
                      rkType = {"form"}
                      value = { this.state.date}
                      placeholder='Fecha'/>
                    <RkTextInput 
                      rkType = {"form"}
                      value = {this.state.time}
                      placeholder='Hora'/>
                    <RkTextInput 
                      rkType= {"form"}
                      value= {this.state.referencia}
                      placeholder='referencia'/>
                    <RkTextInput 
                      rkType= {"form"}
                      value= {this.state.sulfatante}
                      placeholder='sulfatante'/>
                    <RkTextInput 
                      rkType= {"form"}
                      value= {this.state.lote}
                      placeholder='Lote'/>
                    <RkTextInput 
                      rkType = {"form"}
                      value= {this.state.loteFilm}
                      placeholder='Lote Film'/>
                    <RkTextInput 
                      rkType = {"form"}
                      value= {this.state.caducidad}
                      placeholder='Fecha de caducidad'/>
                    <RkTextInput 
                      rkType = {"form"}
                      value= {this.state.bobina}
                      placeholder='Bobina'/>
                    <RkTextInput 
                      rkType = {"form"}
                      value= {this.state.linea}
                      placeholder='Linea'/>
                    <RkTextInput 
                      rkType = {"form"}
                      onChangeText={(text) => this.setState({operario: text})}
                      placeholder='Operario'/>

                  <View rkCardFooter>
                    <RkButton onPress={this._toggleModal} >Cancelar</RkButton>
                    <RkButton onPress={this._confim}  rkType= {"success"}>Registrar</RkButton>
                  </View>

                </RkCard>
                </ScrollView>
        </Modal>

            </View>

            
          }
          bottomViewStyle={styles.bottomContainer}

        />
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