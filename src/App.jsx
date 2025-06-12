import { useState,useRef,useEffect } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'




export default function App(){

  // const buttonRef = useRef(null)

  // useEffect(() => {
  //       if (gameWon) {
  //           buttonRef.current.focus()
  //       }
  //   }, [gameWon])

  const [dieValue,setDieValue] = useState(() => generateAllNewDice())
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
  
  let gameWon = false
  if(dieValue.every(die => die.isHeld)&&
     dieValue.every(die => die.value === dieValue[0].value)
  ){
    gameWon = !gameWon
    document.getElementById("roll-button").innerHTML = "New Game"
    document.getElementById("roll-button").style.width = "100px"
    
  }

  function rollElement(){
    if(document.getElementById("roll-button") .innerHTML === "Roll"){
      setDieValue(oldValue=>{
      return oldValue.map(element=>{
        return element.isHeld === false ? 
        {...element, value : Math.ceil(Math.random()*6) } : element
      })
    })
    }else if(document.getElementById("roll-button") .innerHTML === "New Game"){
      setDieValue(generateAllNewDice)
      gameWon = false
      document.getElementById("roll-button").innerHTML = "Roll"
    }
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

  function confetti() {
  const { width, height } = useWindowSize()
  return (
    <Confetti
      width={width}
      height={height}
    />
  )
}
  return(
    <main>
   
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice 
        are the same. Click each die to freeze it at its 
        current value between rolls.</p>
      <div className="die-div">
        {
        gameWon && <Confetti />}
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
    
      id="roll-button"
      className="roll-button"
      onClick={rollElement}
      >
        Roll</button>
    </main>
  )
}

