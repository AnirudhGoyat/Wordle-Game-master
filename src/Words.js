import wordBank from "./wordle-bank.txt"

export const BoardDefault=[
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""]
]

export const generateWordSet=async()=>{
    let wordSet;
    let correct;
    await fetch(wordBank)
        .then((response)=>response.text())
        .then((result)=>{
            const wordArr=result.split("\n");
            console.log(wordArr);
            correct = wordArr[Math.floor(Math.random()*wordArr.length)];
            console.log(correct);
            wordSet=new Set(wordArr);

            console.log(wordSet);
        });

    return {wordSet,correct};
}
