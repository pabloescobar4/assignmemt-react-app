import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

function App() {
  const [data,setData] = useState([])
  const [search,setSearch] = useState("")
  const [toggle,setToggle] = useState(false)
  const getData = async () => {
    
   axios.get(`http://content.guardianapis.com/search?api-key=test&q=${search}&show-fields=thumbnail,headline&show-tags=keyword&page=1&page-size=10`)

  .then(response => setData(response.data.response.results))
    
  }
  useEffect(() => {
    if(!toggle){
      getData()
    }else{
      console.log("n")
    }
  
  
  },[search])


  const handleChange = () => {
    setToggle(true)
  }
  console.log(search,toggle)
  return (
    <div className="App">
     <input type="text" value={search} placeholder="enter text" onChange={(e) => setSearch(e.target.value)}/>
     <button onClick={handleChange}>Search</button>
    
     { search.length > 0 &&toggle? (data.map((element) => {
      return(
        <>
         {/* <h3>search results for : {search}</h3> */}
     <p key={element.id}>{element.fields.headline}</p>
     <img src={element.fields.thumbnail} alt="" />
     </>
     )})): null}
    </div>
  );
}

export default App;
