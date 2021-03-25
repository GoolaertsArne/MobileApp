import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { UserDAL } from "../database/UserDAL";



export default class ListImport extends Component {
  db = new UserDAL();
  constructor(props) {
    super(props);
    this.state = {
      stringValue: "",
      //text:"",
    };
  }



  onChangeText(stringValue) {
    this.setState({ stringValue: stringValue });
  }



  Split = () => {
    // input string
    var str = this.state.stringValue;
    console.log(str);

    // opsplitsen per student
    var res = str.split("\n");
    console.log(res);

    // eigenschappen van student opsplitsen
    var size = res.length;
    console.log(size);

    for (var i = 0; i < size; i++) {
      var res2 = res[i].split(",");
      this.db.insertStudentsInList(res2);
      
        //console.log(res2);

    }
    this.props.navigation.navigate('Home', { screen: 'StudentList' });
  }




    // If you type something in the text box that is a color, the background will change to that
    // color.

    render(){
      ImportList = (props) => {
        return (
          <TextInput
            {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
            editable
          />
        );
      }

      return (
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderBottomColor: '#000000',
            borderBottomWidth: 1,
          }}>
          <ImportList
            multiline
            numberOfLines={4}
            onChangeText={text => this.onChangeText(text)}
            value={this.state.stringValue}
          />
          <Button style ={styles.btn} title="split" onPress={() => this.Split()} />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  // container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  // head: {
  //   height: 40, fontSize: 30, marginBottom: 10, textAlign: 'center',
  //   alignItems: 'center',
  // },
  btn: {
    elevation: 8,
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#DC143C",
  },
});


