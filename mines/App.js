import React ,{Component} from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import Params from './src/params'
import MineField from './src/components/mineField'
import  {
  createdMineBoard
} from './src/logic'


export default class App extends Component{
  
  constructor(props) {
    super(props)
    this.state = this.createState()
  }

  minesAmount = () => {
    const cols = Params.getColumnsAmount()
    const rows = Params.getRowsAmount()
    return Math.ceil(cols * rows * Params.dificultLevel)
  }


  createState = () => {
    const cols = Params.getColumnsAmount()
    const rows = Params.getRowsAmount()
    return {
      board: createdMineBoard(rows, cols, this.minesAmount()),
    }
  }

  render(){
    return(
        <View style={styles.container}>
            <Text style={styles.welcome}>Iniciando o mines</Text>
            <Text style={styles.instructions}>Tamanho da grade:
              {Params.getRowsAmount()}x{Params.getColumnsAmount()}
            </Text>
            <View style={styles.board}>
                <MineField board={this.state.board}/>
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-end',
  },board :{
      alignItems: 'center',
      backgroundColor: '#aaa'
  },welcome :{
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
  },instructions : {
     color:'red',
  }
})
