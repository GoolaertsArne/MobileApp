import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Screen from '../components/Screen';
import SignatureCanvasTest from './components/SignatureCanvasTest';

export default SignatureCanvasTestScreen = ({navigation}) => (
    <ScrollView style={styles.container}>
        <Screen navigation={navigation} name="SignatureCanvasTest" />

        <View style={{flex: 1}}>
            <Text>Hey</Text>
        </View>
        <View style={styles.bottom}>
            <SignatureCanvasTest />
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