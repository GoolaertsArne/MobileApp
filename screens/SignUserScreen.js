import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Screen from '../components/Screen';
import SignUser from '../components/SignUser';

export default SignUserScreen = ({navigation}) => (
    <ScrollView style={styles.container}>
        <Screen navigation={navigation} name="SignUser" />

        <View style={{flex: 1}}>
            <Text>Hey</Text>
        </View>
        <View style={styles.bottom}>
            <SignUser />
        </View>
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