import React, {useState} from 'react';
import axios from 'axios';

export default function RandomNambers(){
    const[min, setMin] = useState('');
    const[max, setMax] = useState('');
    const[count, setCount] = useState('');
    const[numbers, setNumbers] = useState([]);

    const handleGenerate = async (event) =>{
      event.preventDefault();
      try{
          const response = await axios.post("https://api.random.org/json-rpc/2/invoke", {
              jsonrpc: "2.0",
              method: "generateIntegers",
              params: {
              apiKey: "ce463dca-57ab-4dfa-9d39-e229b37d0cb9",
              n: count,
              min: min,
              max: max,
              replacement: true,
              }, 
              id: 1});
          setNumbers(response.data.result.random.data)
      }catch(error){
          console.error(error);
      }
    };

    return (
        <div className='container'>
          <form className='row w-25' onSubmit={handleGenerate}>
              <div className='mb-3'>
                  <label htmlFor="min" className="form-label">Min:</label>
                  <input type="number" value={min} onChange={(event)=>setMin(event.target.value)} className='form-control'/>
              </div>
              <div className='mb-3'>
                  <label htmlFor="max" className="form-label">Max:</label>
                  <input type="number" value={max} onChange={(event)=>setMax(event.target.value)} className='form-control'/>
              </div>
              <div className='mb-3'>
                  <label htmlFor="count" className="form-label">Count:</label>
                  <input type="number" value={count} onChange={(event)=>setCount(event.target.value)} className='form-control'/>
              </div>
              <input type='submit' value="Generate" className='btn btn-primary'/>
          </form>
          <hr/>
          <div>
            <h3>Generated numbers:</h3>
            {numbers.map((number, index)=>(
              <span key={index} style={{fontSize: '18px'}}>{number} </span>
            ))}
          </div>
        </div>
      );
}