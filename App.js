import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button } from "react-native";
import SignUser from "./components/SignUser";
import * as SQLite from "expo-sqlite";
import { UserDAL } from "./database/UserDAL";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddUser from "./components/AddUser";
import StudentList from "./components/StudentList";
import AdminLogin from './components/AdminLogin';
import { createStackNavigator } from '@react-navigation/stack';
import ImportList from "./components/ImportList";
import HomePageStudents from "./components/HomePageStudents";
// import Location from '../iWasThere/screens/components/Location';
// import { SignedIn, SignedOut } from "./screens/navigation/routes";
// import { isSignedIn } from './screens/authentication/auth';
// import {createRootNavigator} from './screens/navigation/routes';
// import  Container  from './screens/navigation/routes';
//navigator.geolocation = require('@react-native-community/geolocation');

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
      signedIn: false,
      checkedSignIn: false,
      db: new UserDAL()
    };
    // try {
    //   this.state.db.createDB();
    //   this.state.db.createSignaturesTable();
    // } catch {
    // }
  }
  async componentDidMount() {
    //this.state.db.getMasterSignature("test").then (res => console.log(res));
    // isSignedIn()
    // .then((res) => this.setState({ signedIn: res, checkedSignIn: true }))
    // .catch((err) => console.log(err));
    //this.state.db.insertSignatureTest();
    this.state.db.getSignatures(["studentNR","is_masterSignature","date"]).then(res=> console.log(res));
    //this.state.db.insertTest();
    // this.state.db.getAllUsers(["firstName"]).then(res => console.log(res));
    //this.state.db.getSignatures(["signature_id","studentNr", "date",  "location", "is_masterSignature"]).then(data => console.log(data));
    //this.state.db.getAllUsers(["firstName", "lastName", "studentNr"]).then(data => console.log(data));
    //this.state.db.searchStudent("test").then(data => console.log(data));

    
  }

   Tabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={StudentList} />
      </Tab.Navigator>
    );
  }

   AppTabs() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="HomePageStudents" component={HomePageStudents} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} />
        <Stack.Screen name="SignUser" component={SignUser}  />
        <Stack.Screen name="AddUser" component={AddUser}  />
        <Stack.Screen name="ImportList" component={ImportList} />
        <Stack.Screen name="Home" component={this.Tabs} />
      </Stack.Navigator>
    );
  }

  render() {
    //const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
  //   if (!checkedSignIn) {
  //     return null;
  //   }

  //   if(SignedIn){
  //     return <SignedIn/>
  //   }
  //   return <SignedOut/>
  //   // const Layout = createRootNavigator(signedIn);
  //   // return <Layout />;

  // }



      return(
      <NavigationContainer>
        {this.AppTabs()}
        {/* <Tab.Navigator
          tabBarOptions={{
            tabBarVisible: false,
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
        
        </Tab.Navigator> */}
      </NavigationContainer>
      )}

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


