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

  // let gamewon = false
  //   function won(){
  //     dieValue.map(element =>{
  //     if(element.isHeld){
  //       gamewon = true
  //     }else{
  //       gamewon = false
  //     }
  //   })
  //   console.log(gamewon)
  //   }
  

  if(dieValue.every(die => die.isHeld)&&
     dieValue.every(die => die.value === dieValue[0].value)
  ){
    console.log("Game Won")
  }

  function rollElement(){
    setDieValue(oldValue=>{
      return oldValue.map(element=>{
        return element.isHeld === false ? 
        {...element, value : Math.ceil(Math.random()*6) } : element
      })
    })
    //won()
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
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice 
        are the same. Click each die to freeze it at its 
        current value between rolls.</p>
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

