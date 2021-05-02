import React ,{Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  Alert
} from 'react-native'
import Params from './src/params'
import MineField from './src/components/mineField'
import Header from './src/components/header'
import LevelSelected from './src/screens/levelSelecyion'
import  {
  createdMineBoard,
  cloneBoard,
  openField,
  hasExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagUsed 
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
      won: false,
      lost: false,
      showLevelSelection: false,
    }
  }

  onOpenField = (row, column) => {
      const board = cloneBoard(this.state.board)
      openField(board, row, column)
      const lost = hasExplosion(board)
      const won = wonGame(board)

      if(lost) {
        showMines(board)
        Alert.alert('Perdeuu, Aiii que burro!!')
      }

      if(won) {
        Alert.alert('Parabéns, você venceu!!')
      }

      this.setState({ board, lost, won })
  }


  onSelectField = (row, column) => {
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    const won = wonGame(board)

    if(won) {
      Alert.alert('parabéns, voê venceu!!')
    }

    this.setState({ board, won })
  }

  onLevelSelected = level => {
      Params.dificultLevel = level
      this.setState(this.createState())
  }


  render(){
    return(
        <View style={styles.container}> 
          {/**  
            <Text style={styles.welcome}>Iniciando o mines</Text>
            <Text style={styles.instructions}>Tamanho da grade:
              {Params.getRowsAmount()}x{Params.getColumnsAmount()}
            </Text>
          */}
            <LevelSelected isVisible={this.state.showLevelSelection}
                           onLevelSelected={this.onLevelSelected}
                           onCancel={() => this.setState({ showLevelSelection: false })}/>
            <Header flagLeft={this.minesAmount() - flagUsed(this.state.board)}
              onNewGame={() => this.setState(this.createState())}
              onFlagPress={() => this.setState({ showLevelSelection: true })}/>
            <View style={styles.board}>
                <MineField board={this.state.board}
                           onOpenField={this.onOpenField}
                           onSelectField={this.onSelectField}
                           />
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
