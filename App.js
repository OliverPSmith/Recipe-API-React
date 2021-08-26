import React from "react";
import { useState, useEffect, useRef } from 'react';


function App() {
  const [ingredientList, setIngredientList] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const API_KEY = 'd7e2538c290c5496462e9451bf0247b5';
  const APP_ID = '91302c2b';
  
  const search = ({calories}) => {
    console.log('input', inputRef);
    searchForRecipe(inputRef.current.value);
    inputRef.current.value = "";
  }

  const searchForRecipe = (query) => {
    setLoading(true);
    let url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`;
    fetch(url, { mode: "no-cors" })
      .then(response => {
        return response.json();
      })
      .then(res => {
        setIngredientList(res.hits);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      })
  }
  
  useEffect(() => {
    searchForRecipe('');
  }, []);

  return (
    <div className="App">
      <header className='app-header'>
        <div className='search'>
          <input ref={inputRef} placeholder="Search for recipe" />
          <button onClick={search}>Search</button>
        </div>
        {loading && <p>Loading...</p>}
        <div className='wrapper'>
          {ingredientList.map(({ recipe }) => {
            const { label, image, ingredientLines, calories } = recipe;
            return (
              <div key={label} className='ingredient'>
                <span>{label}</span>
                <p className='cals'>Calories: {Math.round(calories * 100) / 100}</p>
                <img src={image} />
                <div className='steps'>
                {ingredientLines.map((step, index) => {
                  return <p key={index}>{step}</p>
                })}
                </div>
              </div>
            )
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
