import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button } from "react-native";
import { mapping, light } from "@eva-design/eva";
import SignUser from "./screens/components/SignUser";
import * as SQLite from "expo-sqlite";
import { UserDAL } from "./database/UserDAL";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddUser from "./screens/components/AddUser";
import StudentList from "./screens/components/StudentList";
import AdminLogin from './screens/components/AdminLogin';
import Location from '../iWasThere/screens/components/Location';

const Tab = createBottomTabNavigator();

class App extends React.Component {
  constructor(props) {
    /*} this.addData = this.addDate.bind(this); */
    super(props);
    this.state = {
      users: undefined,
      location: undefined,
      lat: undefined,
      lng: undefined,
      result: undefined,
      db: new UserDAL()
    };
    // try {
    //   this.state.db.createDB();
    //   this.state.db.createSignaturesTable();
    // } catch {
    // }
  }
  async componentDidMount() {
    // this.state.db.insertSignatureTest();
    // this.state.db.insertTest();
    // this.state.db.getAllUsers(["firstName"]).then(res => console.log(res));
    // this.state.db.getSignatures(["studentNr", "date", "signatureBase64", "location"]).then(data => console.log(data));
    

  
    //this.state.db.getAllUsers(["firstName", "lastName", "studentNr"]).then(data => console.log(data));
    //this.state.db.searchStudent("test").then(data => console.log(data));

    
  }
  renderItem() {
    // return (
    //   <Text>{this.state.users[0]?.firstName}</Text>
    // );
  }

  watchID = null;

  // componentDidMount() {
  //   const urlBase =
  //     "http://nominatim.openstreetmap.org/reverse?format=json&lat=";
  //   const urlMiddle = "&lon=";
  //   const urlEnd = "&zoom=18&addressdetails=1";
  //   RNLocation.requestPermission({
  //     ios: 'always', // or 'always'
  //     android: {
  //       detail: 'coarse', // or 'fine'
  //       rationale: {
  //         title: "We need to access your location",
  //         message: "We use your location to show where you are on the map",
  //         buttonPositive: "OK",
  //         buttonNegative: "Cancel"
  //       }
  //     }
  //   }).then( granted => {
  //     if(granted) {
  //       RNLocation.configure({ distanceFilter: 0 });
  //       RNLocation.getLatestLocation({ timeout: 1000 }).then( (data) => {
  //         console.log("data")
  //         this.setState({
  //           lat: data.latitude,
  //           lng: data.longitude,
  //         });
  //         // fetch(
  //         //   urlBase + this.state.lat + urlMiddle + this.state.lng + urlEnd
  //         // ).then((loc) => {
  //         //   this.setState({
  //         //     location: JSON.stringify(loc),
  //         //   });
  //         // });
  //         console.log(this.state);
  //       });
  //     }
  //   });

  // }
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
            labelStyle: {
              fontSize: 20
            }
          }}>
               <Tab.Screen
            name='AdminLogin'
            component={AdminLogin}
          />
             <Tab.Screen
            name='StudentList'
            component={StudentList}
          />
          <Tab.Screen
            name='AddUser'
            component={AddUser}
          />
          <Tab.Screen
            name='SignUser'
            component={SignUser}
          />
             <Tab.Screen
            name='Location'
            component={Location}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
//AdminLogin

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    height: 100,
  },
  userContainer: {
    height: 100,
  },
});

export default App;


