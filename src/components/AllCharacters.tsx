import CharacterProps from "../interfaces/CharacterProps.tsx";
import Character from "./Character";
import React, {RefObject, useRef, useState} from "react";
import AllCharacterProps from "../interfaces/AllCharacterProps.tsx";

const AllCharacters = ({characterType}: AllCharacterProps) => {
    const [characters, setCharacters] = useState<CharacterProps[] | null>(null);

    React.useEffect(() => {
        fetch(`/${characterType}`)
            .then((res) => res.json())
            .then((data) => setCharacters(data.characters))
            .finally(() => console.log("Results received from Server"));
    }, []);

    const rowRef: RefObject<HTMLDivElement> = useRef(null);
    const scrollToNextCard = () => {
        if (rowRef.current) {
            rowRef.current.scrollBy({
                left: rowRef.current.offsetWidth / 3,
                behavior: 'smooth',
            });
        }
    };
    const scrollToPreviousCard = () => {
        if (rowRef.current) {
            rowRef.current.scrollBy({
                left: -rowRef.current.offsetWidth / 3,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="container-fluid">
            <div style={{marginLeft: "50px"}}>
                <h5 className="backToLink"><a style={{textDecoration: "none"}} href="/"
                                              className="link-light">&lt; Back to home</a>
                </h5>
            </div>
            {characters ? (
                <div className="row mb-5">
                    <div className="col text-center d-flex justify-content-end align-items-center">
                        <button className="btn float-end" onClick={scrollToPreviousCard}>&lt;</button>
                    </div>
                    <div className="col-10">
                        <div className="row flex-nowrap overflow-auto" ref={rowRef}>
                            {characters.map((item, index) => (
                                <Character key={index} copyRightHTML={item.copyRightHTML} id={item.id}
                                           name={item.name}
                                           description={item.description}
                                           imageSource={item.imageSource} type={item.type}/>
                            ))}
                        </div>
                    </div>
                    <div className="col text-center d-flex justify-content-start align-items-center">
                        <button className="btn" onClick={scrollToNextCard}>&gt;</button>
                    </div>
                </div>
            ) : (
                <p className="text-center">Loading data...</p>
            )}
        </div>
    );
}

export default AllCharacters;
