export const Row=({boardArray, play})=>
{
    return (
        <tr>
          {boardArray.map((array, cols) => (
            <Cell key={cols} value={array} columnIndex={cols} play={play} />
          ))}
        </tr>
      )
}

const Cell = ({ value, columnIndex, play }) => {
    let color = 'whiteCircle'
  
    if (value === 1) { color = 'redCircle'} 
    else if (value === 2) { color = 'yellowCircle'}
  
    return (
      <td>
        <div
          justify="center"
          align="center" className="gameCell"
          onClick={() => {
            play(columnIndex)
          }}>
          <div className={color}></div>
        </div>
      </td>
    )
  }