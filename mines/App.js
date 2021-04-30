import React ,{Component} from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import Params from './src/params'
import Field from './src/components/field'

export default class App extends Component{
  render(){
    return(
        <View style={styles.container}>
            <Text style={styles.welcome}>Iniciando o mines</Text>
            <Text style={styles.instructions}>Tamanho da grade:
              {Params.getRowsAmount()}x{Params.getColumnsAmount()}
            </Text>

            <Field />
            <Field opened/>
            <Field opened nearMines={1}/>
            <Field opened nearMines={2}/> 
            <Field opened nearMines={6}/>
            <Field opened nearMines={9}/>
            <Field mined/>
            <Field mined opened/>
            <Field mined opened exploded/>
            <Field flagged/>
            <Field flagged opened/>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF', 
  },welcome :{
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
  },instructions : {
     color:'red',
  }
})
