import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import {UserDAL} from "../database/UserDAL";


class AddUser extends React.Component {
  db = new UserDAL();
  constructor(props) {
    super(props);
    //this.db.insertStudents = this.db.insertStudents.bind(this);
    this.state = {
      firstName: "",
      lastName: "",
      studentNr: "",
      //refresh :"",
    };
    //this.db.insertStudents = this.db.insertStudents.bind(this)
  }

  changeFirstName(firstName) {
    this.setState({ firstName: firstName });
  }

  changeLastName(lastName) {
    this.setState({ lastName: lastName });
  }

  changeStudentNr(studentNr) {
    this.setState({ studentNr: studentNr });
  }

  componentDidMount() {
    this.db = new UserDAL();
    //this.setState({date: , location: })
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.head }> Add a Student </Text>
        {/*{this.createSignaturePad()} */}
        <TextInput
          style={styles.textInput}
          placeholder="Student number"
          onChangeText={(text) => this.changeStudentNr(text)}
          value={this.state.studentNr}
        />
        <TextInput
          style={styles.textInput}
          placeholder="First name"
          onChangeText={(text) => this.changeFirstName(text)}
          value={this.state.firstName}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last name"
          onChangeText={(text) => this.changeLastName(text)}
          value={this.state.lastName}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress= {() => this.save()}
        >
          <Text style={styles.styledButtonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress= {() => this.props.navigation.navigate('ImportList')}
        >
          <Text style={styles.styledButtonText}>Import list</Text>
        </TouchableOpacity>
      </View>
    );
  }

  save() {
    console.log(this.state);
    this.db.insertStudents(this.state).then((res) => {
      console.log(res);
      if (!res) alert("An error occured!");
      // navigate to list
      else {
        this.props.navigation.navigate('Home', { screen: 'StudentList' });
      }
    });
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
    top: 25,
    alignItems: "stretch",
  },
  titleText : {
    fontSize: 40,
    color: "#000",
    //fontWeight: 'bold',

  },
  textInput: {
    height: 50,
    fontSize: 15,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    flexDirection: 'row', backgroundColor: '#F9EFEF' ,borderRadius: 15,
  },
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
  styledButtonText:  {
    color:"#FFFFFF"
},
head: { height: 40, fontSize: 30, marginBottom: 10, marginTop: 10 },
});
export default AddUser;
