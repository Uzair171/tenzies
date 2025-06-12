import { useState } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"

export default function App(){

  const [dieValue,setDieValue] = useState(generateAllNewDice())
  function generateAllNewDice(){
    // const newDice =[]
    // for(let i=0;i<10;i++){
    //   const randomDieNumber = Math.ceil(Math.random() * 6)
    //   newDice.push(randomDieNumber)
    // }
    // return newDice
    return new Array(10)
                    .fill(0)
                    .map(()=> ({value :Math.ceil(Math.random()*6), 
                               isHeld:false,
                               id:nanoid()
                               
                    }))
  }
  const diceElements = dieValue.map((element,index)=>{
        return <Die 
          key = {element.id}
          value = {element.value}
          isHeld = {element.isHeld}
          onHold = {() =>hold(element.id)}
          />
        })

  function rollElement(){
    setDieValue(generateAllNewDice)
  }

  function hold(id){
    setDieValue(prevValue =>{
      return prevValue.map(die=>{
        return die.id === id ? 
        {...die, isHeld:!die.isHeld} : die
      })
    })
  }
  return(
    <main>
      <div className="die-div">
        {diceElements}
        {/* <Die value = {value[1]}/>
        <Die value = {value[2]}/>
        <Die value = {value[3]}/>
        <Die value = {value[4]}/>
        <Die value = {value[5]}/>
        <Die value = {value[6]}/>
        <Die value = {value[7]}/>
        <Die value = {value[8]}/>
        <Die value = {value[9]}/>
        <Die value = {value[0]}/> */}
      </div>

      <button 
      className="roll-button"
      onClick={rollElement}
      >
        Roll</button>
    </main>
  )
}

