import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';


export class ImportList extends Component {
    constructor(props) {
      super(props);
      this.state = { text: '', testWidth: '99%' };
    }
    componentDidMount() {

      setTimeout(() => {
        this.setState({ textboxWidth: '100%' })
      }, 100)
    }

// render() {
// return(
// <ScrollView
// contentContainerStyle={Styles.contentContainerStyle}
// keyboardShouldPersistTaps="handled"
// removeClippedSubviews={false}>

//  <KeyboardAvoidingView>

//       <Text style={Styles.labelPageTitle}>
//         {'bla bla bla'}
//       </Text>
//       <Text>
//           {'bla bla bla'}
//       </Text>
//       <TextInput
//         onChangeText={text => this.setState({ title: text })}
//         style={Styles.textInput}
//         value={title}
//       />

// </KeyboardAvoidingView>
// )
  }