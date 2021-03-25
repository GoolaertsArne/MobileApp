import { StatusBar } from "expo-status-bar";
import React, { Component, useState, Alert,Image } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";


 
export default class AdminLogin extends Component{
  constructor(props) {
    super(props);
    //this.db.insertStudents = this.db.insertStudents.bind(this);
    this.state = {
      email: "",
      password: "",
      adminPassword: "test",
      adminEmail : "test",
      errorMsg: "invalid login"

    };
    //this.db.insertStudents = this.db.insertStudents.bind(this)
  }

  validateLogin(email, password) {
    console.log(email, password);
    if (email == this.state.adminEmail && password == this.state.adminPassword) {
      this.state.isValid = true;
      this.props.navigation.navigate('Home', { screen: 'StudentList' })
    }
    else {
      this.isValid = false;
      alert(this.state.errorMsg);
    }
  }


  changeEmail(email) {
    this.setState({ email: email });
  }

  changePassword(password) {
    this.setState({ password: password });
  }





 render() {
  return (
    <View style={styles.container}>
       {/* <Image style={styles.image} source={{uri: "https://www.ap.be/sites/default/files/users/user663/AP_logo_staand_rgb.jpg"}} /> */}
      <Image source={require('C:\Users\goola\Desktop\school\Schooljaar2\Semester2\iWasThere\iWasThere\assets\background.png')} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => this.changeEmail(email)}
          value={this.state.email}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => this.changePassword(password)}
          value={this.state.password}
        />
      </View>
 
      {/* <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity> */}
 
      <TouchableOpacity style={styles.loginBtn}
       onPress={() => this.validateLogin(this.state.email, this.state.password)}
        // onSignIn().then(() => navigation.navigate('SignedIn'))
       >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}
}

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF0000",
  },

  loginText: {
      color:"#FFFFFF"
  }
});