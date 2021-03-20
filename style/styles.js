import { StyleSheet } from 'react-native'

var styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      marginHorizontal: 16
    },
    item: {
      backgroundColor: '#d3d3d3',
      padding: 20,
      marginVertical: 8
    },
    header1: {
      fontSize: 30,
      textAlign: 'center'
    },
    header2: {
        fontSize: 25,
        textAlign: 'center'
      },
    product: {
      fontSize: 20
    },
    textInput: {
      borderColor: '#CCCCCC',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      height: 50,
      fontSize: 25,
      paddingLeft: 20,
      paddingRight: 20
    },
    styledButton: {
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
        padding: 15,
        margin: 5
      },
    styledButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center'
    } 
})

export default styles