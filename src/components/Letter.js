import React,{useContext, useEffect} from 'react'
import {AppContext} from "../App"

function Letter({letterPosition,attemptValue}) {
  const {board,correctWord,currentAttempt,setDisabledLetters,setCorrectKey,setAlmostKey}=useContext(AppContext);
  const letter=board[attemptValue][letterPosition];

  const correct=correctWord.toUpperCase()[letterPosition]===letter;
  const almost= !correct && letter!=="" && correctWord.toUpperCase().includes(letter);
  
  const letterState=(currentAttempt.attempt>attemptValue)&&(correct?"correct":almost?"almost":"error");

  useEffect(()=>{
      if(letter!=="" && !correct && !almost){
        setDisabledLetters((prev)=>[...prev,letter]);
      }
      if(letter!=="" && correct){
        setCorrectKey((prev)=>[...prev,letter]);
      }
      if(letter!=="" && almost){
        setAlmostKey((prev)=>[...prev,letter]);
      }
  },[currentAttempt.attempt]);

  return (
    <div className='letter' id={letterState}>{letter}</div>
  )
}

export default Letter;