import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./components/Home.tsx";
import Navbar from "./components/Navbar.tsx";
import {CharacterProps} from "./components/Character.tsx";
import Characters from "./components/Characters.tsx";
import React, {useState} from "react";
import "./App.css";
import CharacterDetailsWrapper from "./components/CharacterDetailsWrapper";

function App() {
    const [marvelCharacters, setMarvelCharacters] = useState<CharacterProps[]>([]);
    const [starWarsCharacters, setStarWarsCharacters] = useState<CharacterProps[]>([]);

    React.useEffect(() => {
        fetch(`https://us-central1-comic-app-50173.cloudfunctions.net/app/marvel_characters`)
            .then((res) => res.json())
            .then((data) => setMarvelCharacters(data.characters))
            .catch((err) => console.log("Error fetching data" + err))
            .finally(() => console.log("Results received from Server"));
    }, []);

    React.useEffect(() => {
        fetch(`https://us-central1-comic-app-50173.cloudfunctions.net/app/starwars_characters`)
            .then((res) => res.json())
            .then((data) => setStarWarsCharacters(data.characters))
            .catch((err) => console.log("Error fetching data" + err))
            .finally(() => console.log("Results received from Server"));
    }, []);

    const ogAvengers = [1009368, 1009220, 1009664, 1009351, 1009189, 1009338];
    let avengers: CharacterProps[] = [];
    if (marvelCharacters) {
        avengers = marvelCharacters.filter((character) => ogAvengers.includes(character.id));
    }

    let otherMarvelCharacters: CharacterProps[] = [];
    if (marvelCharacters) {
        otherMarvelCharacters = marvelCharacters.filter((character) => !ogAvengers.includes(character.id));
    }

    return (
        <>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/marvel'
                           element={
                               <>
                                   <Characters array={avengers} header="The Original Avengers"
                                               characterType="marvel_characters"/>
                                   <Characters array={otherMarvelCharacters} header="Others"
                                               characterType="marvel_characters"/>
                               </>
                           }/>
                    <Route path='/star-wars'
                           element={
                               <>
                                   <Characters array={starWarsCharacters} characterType="starwars_characters"
                                               header=""/>
                               </>
                           }/>
                    <Route path='/marvel/:id'
                           element={<><CharacterDetailsWrapper characterType="marvel_characters"/></>}/>
                    <Route path='/star-wars/:id'
                           element={<><CharacterDetailsWrapper characterType="starwars_characters"/></>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;