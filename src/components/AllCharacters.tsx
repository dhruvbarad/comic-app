import Character, {CharacterProps} from "./Character";
import React, {RefObject, useRef, useState} from "react";
import {splitIntoRows, scrollToPreviousCard, scrollToNextCard} from "../utils/util.ts"

interface AllCharacterProps {
    characterType: string
}

const AllCharacters = ({characterType}: AllCharacterProps) => {

    const [characters, setCharacters] = useState<CharacterProps[] | null>(null);

    React.useEffect(() => {
        fetch(`https://us-central1-comic-app-50173.cloudfunctions.net/app/${characterType}`)
            .then((res) => res.json())
            .then((data) => setCharacters(data.characters))
            .catch((err) => console.log("Error fetching data" + err))
            .finally(() => console.log("Results received from Server"));
    }, []);

    const charactersPerRow = 4;
    const characterRows: CharacterProps[][] | undefined = splitIntoRows(characters, charactersPerRow);
    const rowRef: RefObject<HTMLDivElement> = useRef(null);
    return (
        <div className={`container-fluid ${characterType}`}>
            <h5><a className="link-light" href="/">&lt; Back to home</a></h5>
            {characters && characterRows ? (
                characterRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="row mb-5">
                        <div className="col text-center d-flex justify-content-end align-items-center">
                            <button className="btn float-end"
                                    onClick={() => scrollToPreviousCard(rowRef)}>&lt;</button>
                        </div>
                        <div className="col-10">
                            <div className="row flex-nowrap overflow-auto">
                                {row.map((item, index) => (
                                    <Character key={index} copyRightHTML={item.copyRightHTML} id={item.id}
                                               name={item.name} description={item.description}
                                               imageSource={item.imageSource} type={item.type}/>
                                ))}
                            </div>
                        </div>
                        <div className="col text-center d-flex justify-content-start align-items-center">
                            <button className="btn" onClick={() => scrollToNextCard(rowRef)}>&gt;</button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center">Loading data...</p>
            )}
        </div>
    );
}

export default AllCharacters;