import CharacterProps from "../interfaces/CharacterProps";
import Character from "./Character";
import React, {RefObject, useRef, useState} from "react";
import AllCharacterProps from "../interfaces/AllCharacterProps";

const AllCharacters = ({characterType}: AllCharacterProps) => {
    const [characters, setCharacters] = useState<CharacterProps[] | null>(null);

    React.useEffect(() => {
        fetch(`/${characterType}`)
            .then((res) => res.json())
            .then((data) => setCharacters(data.characters))
            .finally(() => console.log("Results received from Server"));
    }, []);

    const splitCharacters = (characters: CharacterProps[] | null, charactersPerRow: number) => {
        const rows: CharacterProps[][] = [];
        if (characters) {
            for (let i = 0; i < characters.length; i += charactersPerRow) {
                const row = characters.slice(i, i + charactersPerRow);
                rows.push(row);
            }
            return rows;
        }
    };

    const charactersPerRow = 4;
    const characterRows = splitCharacters(characters, charactersPerRow);
    const ref = useRef(null);
    const scrollToNextCard = (ref: RefObject<HTMLDivElement>) => {
        if (ref.current) {
            ref.current.scrollBy({
                left: ref.current.offsetWidth / 3,
                behavior: 'smooth',
            });
        }
    };
    const scrollToPreviousCard = (ref: RefObject<HTMLDivElement>) => {
        if (ref.current) {
            ref.current.scrollBy({
                left: -ref.current.offsetWidth / 3,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="container-fluid">
            <h5 className="backToLink"><a href="/" className="link-light">&lt; Back to home</a></h5>
            {characters && characterRows ? (
                characterRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="row mb-5">
                        <div className="col text-center d-flex justify-content-end align-items-center">
                            <button className="btn float-end" onClick={() => scrollToPreviousCard(ref)}>&lt;</button>
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
                            <button className="btn" onClick={() => scrollToNextCard(ref)}>&gt;</button>
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