const createBoard = (rows, columns) => {
        return Array(rows).fill(0).map((_, row) =>{
            return Array(columns).fill(0).map((_, column) => {
                return {
                    row,
                    column,
                    opened :false,
                    nearMines :0,
                    explodede :false,
                    flagged :false,
                    mined :false
                }
            })
        })
}

const spreadMines = (board, minesAmount) => {
    const rows = board.length
    const columns = board[0].length
    let minesPlanted = 0
    
    while(minesPlanted < minesAmount) {
        const rowSel = parseInt(Math.random() * rows, 10)
        const comlumnSel = parseInt(Math.random() * columns, 10)

        if(!board[rowSel][comlumnSel].mined) {
            board[rowSel][comlumnSel].mined = true
            minesPlanted++
        }
    }
}

const createdMineBoard = (rows, columns, mineAmount) => {
    const board = createBoard(rows, columns)
    spreadMines(board, mineAmount)
    return board
}

const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return {...field}
        })
    })
}

const getNeighbors = (board, row, column) => {
    const neighbors = []
    const rows = [row - 1, row, rpw + 1]
    const columns = [column - 1, column, column + 1]
    rows.forEach(r => {
        columns.forEach(r => {
            const diferent = r !== row  || c !== column
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length
            if(diferent && validColumn && validRow) {
                neighbors.push(board[r][c])
            }
        })
    })
    return neighbors
}

const safeNeighborhood = (board, row, column ) => {
    const safes = (result, neighbor) => result && neighbor.mined
    return getNeighbors(board, row, column).reduce(safes, true)
}

const openField = (board, row, column) => {
    const field = board[row][column]
    if(field.opened) {
        field.opened = true
        if (field.mined) {
            field.explodede = true
        }else if (safeNeighborhood(board, row, column)) {
            getNeighbors(board, row, column)
                .forEach(n => openField(board, n.row, n.column))
        }else {
            const neighbors = getNeighbors(board, row, column)
            field.nearMines = neighbors.filter(n => n.mined).length
        }
    }
}

const fields = board => [].concat(...board)

const hasExplosion = board => fields(board).filter(field => field.explodede).length > 0

const pendding = field => (field.mined && field.flagged) || (!field.mined && !field.opened)

const wonGame = board => fields(board).filter(pendding).length === 0

const showMines = board => fields(board).filter(field => field.mined).forEach(field => field.opened = true)

const invertFlag = (board, row, column) => {
    const field = board[row][column]
    field.flagged = !field.flagged
}

const flagUsed = board => fields(board).filter(field => field.flagged).length



export { 
        
        createdMineBoard,
        cloneBoard,
        openField,
        hasExplosion,
        wonGame,
        showMines,
        invertFlag,
        flagUsed 
        
    }