import {createGlobalStyle} from 'styled-components';
import {BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom';
import CharacterDetails from "./components/CharacterDetails.tsx";

import AllCharacters from "./components/AllCharacters.tsx";

const DarkModeStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

  * {
    margin: 10px 0 0 0;
    padding: 0;
    box-sizing: border-box;
    //outline: 1px solid white;
  }

  ::-webkit-scrollbar {
    background: black;
  }

  ::-webkit-scrollbar-thumb {
    background: #2c3034;
  }

  ::-webkit-scrollbar-corner {
    background: #000;
  }

  body, .card {
    margin-bottom: 40px;
    color: #e8eaed;
    background: black;
    font-family: "Roboto", sans-serif;
  }

  .nav-link, .nav-link:hover {
    color: #e8eaed;
    font-size: 25px;
  }

  .card-footer a {
    color: grey;
  }

  #backToLink {
    margin: 0 0 10px 50px;
  }`;

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
    background-color: lightskyblue;
  }

  .card {
    border-radius: 15px;
    transition: all .3s;
    box-shadow: 0 0 15px 1px lightskyblue;
  }

  .card .card-title {
    background-color: lightskyblue;
  }`;

function App() {
    return (
        <>
            <DarkModeStyle/>
            <Router>
                <Routes>
                    <Route path='/marvel'
                           element={<><MarvelStyle/><AllCharacters imageLogo="/dist/marvel.png"
                                                                   characterType="marvel_characters"/></>}/>
                    <Route path='marvel/:id'
                           element={<><MarvelStyle/><CharacterDetailsWrapper characterType="marvel_characters"/></>}/>
                    <Route path='/star-wars'
                           element={<><StarWarsStyle/><AllCharacters imageLogo="/dist/star-wars.png"
                                                                     characterType="marvel_characters"/></>}/>
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