import React from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import Screen from '../components/Screen';
import Location from '../components/Location';

export default LocationScreen = ({navigation}) => (
    <SafeAreaView style={{flex:1}}>
        <Screen navigation={navigation} name="Location" />

        <Location />
    </SafeAreaView>
)