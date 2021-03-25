import React, { Component } from "react";
import { StyleSheet, Dimensions, View, Button, Text } from "react-native";
import SignaturePad from "react-native-signature-pad";
//import { StackNavigator } from 'react-navigation';
import { TabRouter } from "@react-navigation/routers";
//import Resemble from "resemblejs";
import Location from './Location';
import { UserDAL } from '../database/UserDAL';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
//import Rembrandt from 'rembrandt';


const compare = require("resemblejs").compare;

class SignUser extends React.Component {
  db = new UserDAL();
  constructor(props) {

    super(props);
    this.state = {
      signaturePad: null,
      signaturePadKey: 0,
      image: "",
      image1: "",
      image2: "",
      lastName: this.props.route.params.item.lastName,
      studentNr: this.props.route.params.item.studentNr,
      firstName: this.props.route.params.item.firstName,
      location: "Antwerpen",
      date: "datetime('now')",
      //is_master: 0,
      latitude: '',
      longitude: '',
      errorMsg: 'Unable to read location, please try again later!',
      readyToLaunch: false,
      addressData: [],
    };
  }



  //var is_masterSignature;


  async componentDidMount() {
    let geoOptions = {
      enableHighAccuracy: true,
      maximumAge: 20000,
      timeout: 60000
    }
    this.setState({ readyToLaunch: false });
    //Asynchronous Pattern to read location
    Geolocation.getCurrentPosition(this.geoLocationSuccess, this.geoLocationFailure, geoOptions);

  }



  state = {
    signaturePadKey: 0,
  };

  _signaturePadError = (error) => {
    console.error(error);
  };

  _signaturePadChange = ({ base64DataUrl }) => {
    this.setState({ image: base64DataUrl });
  };

  cleanButtonAction = () => {
    this.setState({ signaturePadKey: this.state.signaturePadKey + 1 });
  };





  saveButtonAction = () => {
    //console.log(this.state.addressData.display_name);
    this.setState({ signaturePadKey: this.state.signaturePadKey + 1 });
    this.db.insertSignature([this.state.studentNr, this.state.date, this.state.image, this.state.addressData.display_name], this.state.studentNr).then((res) => {
      console.log((res));
      if (!res) alert("An error occured!");
      else {
        //this.signatureVerification()/*.then((res )=> {console.log(res)});*/
        this.props.navigation.navigate('Home', { screen: 'StudentList' })
      }

    })
    }






  //navigate to list or details

  createSignaturePad = () => {
    this.signaturePad = React.createElement(SignaturePad, {
      onError: this._signaturePadError,
      onChange: this._signaturePadChange,
      style: { flex: 1, backgroundColor: "white" },
      key: this.state.signaturePadKey,
    });
    return this.signaturePad;
  };




  geoLocationSuccess = (position) => {
    const response = position.coords;
    const latitude = response.latitude;
    const longitude = response.longitude;
    this.setState({ latitude, longitude, readyToLaunch: true });

    //console.log(latitude, longitude)
    //gets data frop OSM API
    let url = 'http://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + latitude + '&lon=' + longitude;
    axios.get(url)
      .then(response => {
        //console.log('getting data from axios', response.data)
        this.setState({
          addressData: response.data
        })
        //console.log(this.state.latitude)
      })
      .catch(function (error) {
        console.log(error)
      })
  }


  //Geolocation failure callback method
  geoLocationFailure = (err) => {
    console.log(err)
    this.setState({ readyToLaunch: false, errorMsg: 'Geo Location failure, permission denied, Please enable it.' });
    Alert.alert('Error', this.state.errorMsg)
  }


  //DID NOT WORK 
  //  rembrandt = new Rembrandt({
  //    image1: this.db.getMasterSignature(this.state.studentNr),
  //    image2: this.state.image,
  //   thresholdType: Rembrandt.THRESHOLD_PERCENT,
  //   maxThreshold: 0.01,
  //   maxDelta: 0.02,
  //   maxOffset: 0,
  //   renderComposition: true, 
  //   compositionMaskColor: Rembrandt.Color.RED 
  // })

  // signatureVerification() {
  //   rembrandt.compare()
  //   .then(function (result) {
  //     console.log('Passed:', result.passed)
  //     console.log('Pixel Difference:', result.differences, 'Percentage Difference', result.percentageDifference, '%')
  //     console.log('Composition image buffer:', result.compositionImage)

  //     // Note that `compositionImage` is an Image when Rembrandt.js is run in the browser environment
  //   })
  //   .catch((e) => {
  //     console.error(e)
  //   })

  // }


  //DID NOT WORK (new Img() keeps giving errors) getMasterSignature DOES WORK
  signatureVerification() {
    const options = {
      returnEarlyThreshold: 5
    };
    //console.log(this.state.studentNr['c']);
    //this.db.getMasterSignature(this.state.studentNr).then (res => console.log(res))

    var image1 = this.db.getMasterSignature(this.state.studentNr).then(res => console.log(res))
    var image2 = this.state.image;
    console.log("image 1:" + image1);
    //console.log("image 2:"+ image2);
    compare(image1, image2, options, function (err, data) {
      if (err) {
        console.log("An error!");
      } else {
        console.log("Percent mismatch: " + data.misMatchPercentage + "%");
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.head}> {this.state.studentNr} - {this.state.lastName} - {this.state.firstName}  </Text>
        {this.createSignaturePad()}
        <Button title="clear" onPress={this.cleanButtonAction}></Button>
        <Button title="save" onPress={this.saveButtonAction}></Button>
      </View>
    );
  }
}
export default SignUser;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {
    height: 40, fontSize: 30, marginBottom: 10, textAlign: 'center',
    alignItems: 'center',
  }
});
