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

export { createdMineBoard }