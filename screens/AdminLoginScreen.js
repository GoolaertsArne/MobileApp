import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Screen from '../components/Screen';
//import AdminLogin from '../components/SignUser';
import AdminLogin from '../components/AdminLogin';

export default AdminLoginScreen = ({navigation}) => (
    <ScrollView style={styles.container}>
        <Screen navigation={navigation} name="AdminLogin" />

        <AdminLogin />        
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    bottom: {
        flex: 1,
        justifyContent: "flex-end"
    },
    Text: {
        color: "#161924",
        fontSize: 20,
        fontWeight:"500"
    }
})