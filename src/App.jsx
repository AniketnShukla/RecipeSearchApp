import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Axios from "axios"
import './App.css'
import {YOUR_APP_ID, YOUR_APP_KEY} from './key'
import RecipeTile from './components/RecipeTile'

function App() {
  const [query, setQuery] = useState("")
  const [recipes, setRecipes] = useState([])
  const [healthLabels, setHealthLabels] = useState("vegan")
  var url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabels}`

  const getRecipes = async () => {
    var result = await Axios.get(url);
    setRecipes(result.data.hits)
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
    console.log(healthLabels)
    console.log(query)

  }
  return (
    <div className="App">
      <h1 onClick={getRecipes} className="maintext">Food Recipes</h1>
      <form className="app_searchForm" onSubmit={onSubmit}>
        <input 
        className='app__input'
        type="text" 
        placeholder="Enter Ingredient" 
        value={query} 
        onChange={(e) => {
          setQuery(e.target.value)
          console.log(e.target.value)
        }}
        />
        <input
        className='app__submit'
        type = "submit"
        value = "Search"
        />

        <select className='app_healthLabels' 
          onChange={(e) => {
            setHealthLabels(e.target.value)}
          }>
      
          <option value="vegan" onClick={() => setHealthLabels("vegan")}>vegan</option>
          <option value="vegetarian" onClick={() => setHealthLabels("vegetarian")}>vegetarian</option>
          <option value="dairy-free" onClick={() => setHealthLabels("dairy-free")}>dairy-free</option>
          <option value="gluten-free" onClick={() => setHealthLabels("gluten-free")}>gluten-free</option>
          <option value="wheat-free" onClick={() => setHealthLabels("wheat-free")}>wheat-free</option>
          <option value="fat-free" onClick={() => setHealthLabels("fat-free")}>fat-free</option>
          <option value="low-sugar" onClick={() => setHealthLabels("low-sugar")}>low-sugar</option>
          <option value="egg-free" onClick={() => setHealthLabels("egg-free")}>egg-free</option>
          <option value="peanut-free" onClick={() => setHealthLabels("peanut-free")}>peanut-free</option>
          <option value="tree-nut-fre" onClick={() => setHealthLabels("tree-nut-fre")}>tree-nut-fre</option>
          <option value="soy-free" onClick={() => setHealthLabels("soy-free")}>soy-free</option>
          <option value="fish-free" onClick={() => setHealthLabels("fish-free")}>fish-free</option>
          <option value="shellfish-free" onClick={() => setHealthLabels("shellfish-free")}>shellfish-free</option>
        </select>
      </form>
    <div className='app__recipes'>
      {recipes.map(recipefromList => {
        return <RecipeTile recipe={recipefromList} />
      })}
    </div>
    </div>
  )
}

export default App
