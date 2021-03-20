import React from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import Screen from '../components/Screen';
import UserList from '../components/UserList';

export default UserListScreen = ({navigation}) => (
    <SafeAreaView style={{flex:1}}>
        <Screen navigation={navigation} name="StudentList" />
        <StudentList />
    </SafeAreaView>
)