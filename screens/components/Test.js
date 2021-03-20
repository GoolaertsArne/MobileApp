import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import styles from '../style/styles.js'

export default class Test extends Component {  
      
    constructor(props) {
      super(props)
      this.state = { students: [] }
      this.renderItem = this.renderItem.bind(this)
    } 
  
    // componentDidMount still works, but only 
    // the first time it is loaded
    getStudents() {
        const data = ["Demo1", "Demo2"];
      /*axios.get('http://localhost:4000/products/')
        .then(response => {
          this.setState({ students: response.data })
        })  
        .catch(function (error) {
          console.log(error)  
        })*/
    }

    /*componentDidMount() {
      this.getStudents()
      // listen to events emitted by React Navigation, in this case focus
      this._unsubscribe = this.props.navigation.addListener('focus', () => { this.getStudents() })
    }*/


    renderItem(item) {
      return (<TouchableOpacity
                onPress={() => { this.props.navigation.navigate('Edit', { firstName: item.firstName }) }}>
                <View style={ styles.item }>
                </View>
              </TouchableOpacity>)
    }

    render() {
      return (
        <View style={ styles.container }>
          <Text style={ styles.header1 }>List of Students</Text>
          <View style={ styles.container }>
            <FlatList
              data={ this.state.students }
              renderItem={ (item) => this.renderItem(item.item) }
             // keyExtractor={ (product) => product._id }
            />
          </View>
        </View>
      )
    }
  }