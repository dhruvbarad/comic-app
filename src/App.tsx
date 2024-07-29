import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import {CharacterProps} from "./components/Character";
import Characters from "./components/Characters";
import React, {useState} from "react";
import "./App.css";
import CharacterDetailsWrapper from "./components/CharacterDetailsWrapper";

function App() {
    const [marvelCharacters, setMarvelCharacters] = useState<CharacterProps[]>([]);
    const [starWarsCharacters, setStarWarsCharacters] = useState<CharacterProps[]>([]);
    const [dcCharacters, setDcCharacters] = useState<CharacterProps[]>([]);

    React.useEffect(() => {
        fetch(`https://us-central1-comic-app-cd887.cloudfunctions.net/app/marvel_characters`)
            .then((res) => res.json())
            .then((data: any) => setMarvelCharacters(data.characters))
            .catch((err) => console.log("Error fetching data" + err))
            .finally(() => console.log("Results received from Server"));
    }, []);

    React.useEffect(() => {
        fetch(`https://us-central1-comic-app-cd887.cloudfunctions.net/app/starwars_characters`)
            .then((res) => res.json())
            .then((data: any) => setStarWarsCharacters(data.characters))
            .catch((err) => console.log("Error fetching data" + err))
            .finally(() => console.log("Results received from Server"));
    }, []);

    React.useEffect(() => {
        fetch(`https://us-central1-comic-app-cd887.cloudfunctions.net/app/dc_characters`)
            .then((res) => res.json())
            .then((data: any) => setDcCharacters(data.characters))
            .catch((err) => console.log("Error fetching data" + err))
            .finally(() => console.log("Results received from Server"));
    }, []);

    return (
        <>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/marvel' element={
                        <>
                            <Characters array={marvelCharacters} header="Marvel"
                                        characterType="marvel_characters"/>
                        </>
                    }/>
                    <Route path='/star-wars' element={
                        <>
                            <Characters array={starWarsCharacters} characterType="starwars_characters"
                                        header="Star Wars"/>
                        </>
                    }/>
                    <Route path='/dc' element={
                        <>
                            <Characters array={dcCharacters} characterType="dc_characters"
                                        header="DC"/>
                        </>
                    }/>
                    <Route path='/marvel/:id'
                           element={<><CharacterDetailsWrapper characterType="marvel_characters"/></>}/>
                    <Route path='/star-wars/:id'
                           element={<><CharacterDetailsWrapper characterType="starwars_characters"/></>}/>
                    <Route path='/dc/:id'
                           element={<><CharacterDetailsWrapper characterType="dc_characters"/></>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
