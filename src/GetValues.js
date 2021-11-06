import React, {useState , useEffect } from 'react'




const test = () =>{
//     fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=60min&apikey=${process.env.REACT_APP_API_KEY}`)
//   .then(response => response.json())
//   .then(data => console.log(data));

fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=${process.env.REACT_APP_API_KEY}`)
.then(response => response.json())
.then(data => console.log(data));


}


function GetValues({portfolio}) {
    useEffect (()=>{
        console.log('useeffect')
        portfolio.forEach(element => {
            console.log(element)
        });
    }, [])

    return (
        <div>
           <button onClick={test}>Test</button> 
        </div>
    )
}

export default GetValues
