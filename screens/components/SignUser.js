import React, { Component } from "react";
import { StyleSheet, Dimensions, View, Button, Text } from "react-native";
import SignaturePad from "react-native-signature-pad";
//import { StackNavigator } from 'react-navigation';
import { TabRouter } from "@react-navigation/routers";
// import Resemble from "resemblejs";
import Location from './Location';


class SignUser extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      signaturePad: null,
      signaturePadKey: 0,
      image: "",
      lastName: this.props.route.params.item.lastName,
      studentNr: this.props.route.params.item.studentNr,
      firstName: this.props.route.params.item.firstName,
      location: new Location,
      date: "",
    };
  }
  //var is_masterSignature;


  componentDidMount() { }

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

  //Nadat ik save of terug naar list ga, blijft de naam van mijn vorig geselecteerde student aangeduid? Alleen als ik mijn vscode save of herlaad verandert deze wel 
  saveButtonAction = () => {
    console.log(this.state.image);
    this.setState({ signaturePadKey: this.state.signaturePadKey + 1 });
    this.props.navigation.navigate('StudentList')
    this.cleanButtonAction;

    //navigate to list or details
  };
  createSignaturePad = () => {
    this.signaturePad = React.createElement(SignaturePad, {
      onError: this._signaturePadError,
      onChange: this._signaturePadChange,
      style: { flex: 1, backgroundColor: "white" },
      key: this.state.signaturePadKey,
    });
    return this.signaturePad;
  };

  // signatureVericication() {
  //   resemble.outputSettings({ useCrossOrigin: false });
  //   var diff = resemble("data:image/jpeg;base64,/9j/4AAQSkZJRgAB...").compareTo(
  //     "data:image/jpeg;base64,/9j/,/9j/4AAQSkZJRg..."
  //   );
  // }

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
