import React, {useState} from "react";
import axios from "axios";

export default function HeadsOrTails(){
    const[quess, setQuess] = useState('');
    const[result, setResult] = useState(null);

    const handleGuess = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post("https://api.random.org/json-rpc/2/invoke", {
                jsonrpc: "2.0",
                method: "generateIntegers",
                params: {
                apiKey: "ce463dca-57ab-4dfa-9d39-e229b37d0cb9",
                n: 1,
                min: 0,
                max: 1,
                replacement: true,
                }, 
                id: 1});
            
                const randomNumber = response.data.result.random.data[0];
                const resultText = randomNumber === 0 ? 'heads' : 'tails';
                setResult(resultText);
                if(resultText === quess.toLowerCase()){
                    console.log(response.data);
                    alert('You won!');
                }
                else{
                    console.log(response.data);
                    alert('You lost!');
                }
        }catch(error){
            console.error(error);
        }
    }

    return (
        <div className='container'>
            <form className='row w-25' onSubmit={handleGuess}>
                <div className='mb-3'>
                  <label htmlFor="quess" className="form-label">Quess:</label>
                  <input type="text" value={quess} onChange={(event)=>setQuess(event.target.value)} className='form-control'/>
              </div>
              <input type='submit' value="Flip the coin" className='btn btn-primary'/>
            </form>
            {result && <div>The result is: {result}</div>}
        </div>
    )
}
