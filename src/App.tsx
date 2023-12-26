import {createGlobalStyle} from 'styled-components';
import {BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom';
import CharacterDetails from "./components/CharacterDetails.tsx";

import AllCharacters from "./components/AllCharacters.tsx";
import Home from "./components/Home.tsx";
import Navbar from "./components/Navbar.tsx";
import "./App.css";

const MarvelStyle = createGlobalStyle`
  .btn, .btn:hover {
    color: #e8eaed;
    background-color: rgba(255, 0, 50, 0.70);
  }

  .card {
    border-radius: 15px;
    transition: all .3s;
    box-shadow: 0 0 15px 1px rgba(255, 0, 50, 0.70);
  }

  .card .card-title {
    background-color: rgba(255, 0, 50, 0.70);
  }`;

const StarWarsStyle = createGlobalStyle`
  .btn, .btn:hover {
    color: #e8eaed;
    background-color: hsl(49, 100%, 40%);
  }

  .card {
    border-radius: 15px;
    transition: all .3s;
    box-shadow: 0 0 15px 1px hsl(49, 100%, 40%);
  }

  .card .card-title {
    background-color: hsl(49, 100%, 40%);
  }`;

function App() {
    return (
        <>
            <Navbar />
            <Router>
                <Routes>
                    <Route path = '/' element={<Home />}/>
                    <Route path='/marvel'
                           element={<><MarvelStyle/><AllCharacters characterType="marvel_characters"/></>}/>
                    <Route path='/marvel/:id'
                           element={<><MarvelStyle/><CharacterDetailsWrapper characterType="marvel_characters"/></>}/>
                    <Route path='/star-wars'
                           element={<><StarWarsStyle/><AllCharacters characterType="starwars_characters"/></>}/>
                    <Route path='/star-wars/:id'
                           element={<><StarWarsStyle/><CharacterDetailsWrapper characterType="starwars_characters"/></>}/>
                </Routes>
            </Router>
        </>
    );
}


interface ComicWrapper {
    characterType: string;
}

const CharacterDetailsWrapper = ({characterType}: ComicWrapper) => {
    const params = useParams();
    return <CharacterDetails id={parseInt(params.id as string)} characterType={characterType}/>;
};

export default App;