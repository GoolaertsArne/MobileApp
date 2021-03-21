import React, { Component } from 'react';   
import { StyleSheet,TouchableOpacity, Text, TextInput, View, SafeAreaView,Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
// import Geolocation from 'react-native-geolocation-service'
import axios from 'axios';

class Location extends Component {
    state = {
        latitude:'',
        longitude:'',
        errorMsg:'Unable to read location, please try again later!',
        readyToLaunch:false,
        addressData:[]
    }

    componentDidMount(){
        let geoOptions = {
            enableHighAccuracy:true,
            maximumAge:20000, 
            timeout:60000
        }
           
        

        //state is false to launch the next screen
        this.setState({readyToLaunch:false});

        //Asynchronous Pattern to read location
        Geolocation.getCurrentPosition(this.geoLocationSuccess,this.geoLocationFailure,geoOptions);
        //this.getAddress();
    }   

    //Geolocation success callback method
    geoLocationSuccess = (position) => {
        console.log("test");
        const response = position.coords;
        const latitude = response.latitude;
        const longitude = response.longitude;
        console.log('Lat & Lng', latitude, longitude);
        this.setState({ latitude, longitude, readyToLaunch:true });
        console.log(latitude, longitude)

        //console.log(latitude, longitude)
        //gets data frop OSM API
        let url = 'http://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + latitude + '&lon=' + longitude;
        axios.get(url)
            .then(response =>{
                console.log('getting data from axios', response.data)
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
    

    nextScreen() {
        {this.state.readyToLaunch
            && this.props.navigation.navigate('NextScreen');
        }
        {!this.state.readyToLaunch && Alert.alert('Error',this.state.errorMsg)}
    }

    // getAddress() {
    //     console.log(this.state.latitude, this.state.longitude)
    //     let url = 'http://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + this.state.latitude + '&lon=' + this.state.longitude;
    //     axios.get(url)
    //         .then(response =>{
    //             this.setState({display_name: response.data})
    //             console.log(this.state.latitude)
    //         })
    //         .catch(function (error) {
    //             console.log(error)
    //         })
    // }

    render() {
        return (
            <View style={styles.container}>
                <Text>Geo Location Testing....</Text>
                <Text>Latitude: {this.state.latitude} </Text>
                <Text>Longitude: {this.state.longitude} </Text>
                <Text>Display_name: {this.state.addressData.display_name} </Text>
            </View>

        );
    }
}

export default Location;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },

    containerText: {
        color: '#FBFBFB',
        // fontFamily: 'Noto Sans',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: 0.05,
        justifyContent: 'center',
        alignSelf: 'center'
    },
})