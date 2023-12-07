import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";

function GameOver() {
  const { board, setBoard, gameOver, currentAttempt, correctWord } =
    useContext(AppContext);
  const [meaning, setMeaning] = useState([]);
  const [antonyms, setAntonym] = useState([]);
  const [synonyms, setSynonym] = useState([]);
  const [partOfSpeech, setpartOfSpeech] = useState("");

  useEffect(() => {
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${correctWord}`;
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        console.log(result[0].meanings[0].definitions);
        setMeaning(result[0].meanings[0].definitions);
        setpartOfSpeech(result[0].meanings[0].partOfSpeech);

        for(let i=0 ; i<result[0].meanings.length; i++)
        {
          if(result[0].meanings[i].antonyms.length > 0)
          {
            setAntonym(result[0].meanings[i].antonyms);
            break;
          }
        }
        for(let i=0 ; i<result[0].meanings.length; i++)
        {
          if(result[0].meanings[i].synonyms.length > 0)
          {
            setSynonym(result[0].meanings[i].synonyms);
            break;
          }
        }

      });
  }, []);

  return (
    <div className="gameOver">
      <h1>{gameOver.guessedWord ? "You correctly guessed" : "You failed"}</h1>
      <h1>Correct:{correctWord}</h1>

      {gameOver.guessedWord && (
        <h3>You guessed in {currentAttempt.attempt} attempts</h3>
      )}

      <div className="wrapper">
        <div className="search">
          
          <p>
            {" "}
            <strong style={{ color: "black" }}>DEFINITIONS</strong>
          </p>
          {meaning.length > 0 &&
            meaning.map((meaning, index) => {
              if (index < 3)
                return (
                  <p class="meaningtext">
                    {index + 1}. {meaning.definition}
                  </p>
                );
            })}
          <p>
            
            <strong style={{ color: "black" }}>ANTONYMS</strong>
          </p>
          {antonyms.length > 0 &&
            antonyms.map((antonym, index) => {
              if (index < 3)
                return (
                  <p style={{color:"black"}}>
                    {index + 1}. {antonym}
                  </p>
                );
            })}
          {antonyms.length == 0 && <p style={{color:"black"}}> No antonyms Present</p>}

          <p>
            
            <strong style={{ color: "black" }}>SYNONYMS</strong>
          </p>
          {synonyms.length > 0 &&
            synonyms.map((synonym, index) => {
              if (index < 3)
                return (
                  <p style={{color:"black"}}>
                    {index + 1}. {synonym}
                  </p>
                );
            })}
          {synonyms.length == 0 && <p style={{color:"black"}}> No synonyms Present</p>}

          <p style={{color:"black"}}>
            
            <strong style={{ color: "black" }}>Part Of Speech : </strong> {partOfSpeech}
    
          </p>
        </div>
      </div>
    </div>
  );
}

export default GameOver;
