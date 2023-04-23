import React, {useState} from "react";
import axios from "axios";

export default function Dice(){
    const[computerScore, setComputerScore] = useState(0);
    const[userScore, setUserScore] = useState(0);
    const[userDice, setUserDice] = useState([]);
    const[computerDice, setComputerDice] = useState([]);
    const[gameInProgress, setGameInProgress] = useState(false);

    const rollDice = async () =>{
        try {
            const response = await axios.post(
                "https://api.random.org/json-rpc/2/invoke",
                {
                jsonrpc: "2.0",
                method: "generateIntegers",
                params: {
                    apiKey: "ce463dca-57ab-4dfa-9d39-e229b37d0cb9",
                    n: 2,
                    min: 1,
                    max: 6,
                    replacement: true,
                },
                id: 1,
                }
            );

            const userRoll = response.data.result.random.data[0];
            const computerRoll = response.data.result.random.data[1];
            const newUserDice = [userRoll];
            const newComputerDice = [computerRoll];
            setUserDice(newUserDice);
            setComputerDice(newComputerDice);
            const newUserScore = userScore + userRoll;
            const newComputerScore = computerScore + computerRoll;
            setUserScore(newUserScore);
            setComputerScore(newComputerScore);

            if(newUserScore >= 20 || newComputerScore >= 20){
                setGameInProgress(false);
                if(newUserScore > newComputerScore){
                    alert('You win!');
                }
                else if(newComputerScore === newUserScore){
                    alert('It is a tie!');
                }
                else{
                    alert('You lose!');
                }
            }
        }catch(error){
            console.error(error);
        }
    };

    const startGame = () =>{
        setComputerScore(0);
        setUserScore(0);
        setComputerDice([]);
        setUserDice([]);
        setGameInProgress(true);
    }

    return (
        <div className="container">
            {gameInProgress ? (
                <div>
                    <div className="row">
                        <div className="col">
                            <h3>User's turn</h3>
                            {userDice.map((value, index) => (
                                <img style={{width: '100px'}}
                                key={index}
                                src={`dice-${value}.png`}
                                alt={`Dice ${value}`}
                                />
                            ))}
                            <p>Score: {userScore}</p>
                        </div>
                        <div className="col">
                            <h3>Computer's turn</h3>
                            {computerDice.map((value, index) => (
                                <img style={{width: '100px'}}
                                key={index}
                                src={`dice-${value}.png`}
                                alt={`Dice ${value}`}
                                />
                            ))}
                            <p>Score: {computerScore}</p>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={rollDice}>Roll the dice!</button>
                </div>
                ) : (
                <div>
                    <h2>Let's play Dice!</h2>
                    <button className="btn btn-primary" onClick={startGame}>Start the game!</button>
                </div>
            )}
        </div>
    );
}