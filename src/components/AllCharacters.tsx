import CharacterProps from "../interfaces/CharacterProps";
import Character from "./Character";
import React, {RefObject, useRef, useState} from "react";
import AllCharacterProps from "../interfaces/AllCharacterProps.tsx";

const AllCharacters = ({characterType}: AllCharacterProps) => {
    const [characters, setCharacters] = useState<CharacterProps[] | null>(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://us-central1-comic-app-50173.cloudfunctions.net/app/${characterType}`);
                if (!response.ok) {
                    console.error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setCharacters(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData().then(() => console.log("Fetched successfully"));
    }, [characterType]);

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
            <h5 className="backToLink"><a href="https://comic-app-50173.web.app" className="link-light">&lt; Back to
                home</a></h5>
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