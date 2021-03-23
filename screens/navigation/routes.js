
import { NavigationContainer } from "@react-navigation/native";
import AdminLogin from '../components/AdminLogin';
import StudentList from '../components/StudentList';
import { createBottomTabNavigator } from 'react-navigation-tabs';
//import StudentList from '../components/AddUser';
//import StudentList from '../components/SignUser';
import { TabNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import { create } from "react-test-renderer";

export const SignedOut = createBottomTabNavigator({
  screen: AdminLogin
})

export const SignedIn = createBottomTabNavigator({
  StudentList: {
    screen: StudentList,
  }
  // render() {
  //     return (
  //       <NavigationContainer>
  //         <Tab.Navigator
  //           tabBarOptions={{
  //             activeTintColor: 'blue',
  //             inactiveTintColor: 'gray',
  //             labelStyle: {
  //               fontSize: 20
  //             }
  //           }}>
  //                <Tab.Screen
  //             name='AdminLogin'
  //             component={AdminLogin}
  //           />
  //              <Tab.Screen
  //             name='StudentList'
  //             component={StudentList}
  //           />
  //           <Tab.Screen
  //             name='AddUser'
  //             component={AddUser}
  //           />
  //           <Tab.Screen
  //             name='SignUser'
  //             component={SignUser}
  //           />

  //         </Tab.Navigator>
  //       </NavigationContainer>
  //     );
  // //   }
})

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn,
      },
      SignedOut: {
        screen: SignedOut,
      },
    },
    {
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
    }
  );
};
// const Container = createAppContainer(createRootNavigator);
// export default Container;
