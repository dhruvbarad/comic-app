import {BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom';
import CharacterDetails from "./components/CharacterDetails.tsx";

import AllCharacters from "./components/AllCharacters.tsx";
import Home from "./components/Home.tsx";
import "./App.css";
import Navbar from "./components/Navbar.tsx";

function App() {
    return (
        <>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/marvel'
                           element={<><AllCharacters characterType="marvel_characters"/></>}/>
                    <Route path='/marvel/:id'
                           element={<><CharacterDetailsWrapper characterType="marvel_characters"/></>}/>
                    <Route path='/star-wars'
                           element={<><AllCharacters characterType="starwars_characters"/></>}/>
                    <Route path='/star-wars/:id'
                           element={<><CharacterDetailsWrapper characterType="starwars_characters"/></>}/>
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