import {scrollToNextCard, scrollToPreviousCard} from "../utils/util";
import Character, {CharacterProps} from "./Character";
import {RefObject, useRef} from "react";

interface CharactersProps {
    header: string;
    characterType: string;
    array: CharacterProps[];
}

const Characters = ({array, header, characterType}: CharactersProps) => {
    const rowRef: RefObject<HTMLDivElement> = useRef(null);
    return (array ? (
        <div className={`row ${header === "" ? "" : "mt-5"} mb-5 animate__animated animate__fadeIn ${characterType}`}>
            <h3 className="text-center">{header}</h3>
            <div className="col text-center d-flex justify-content-end align-items-center">
                <button className="btn float-end"
                        onClick={() => scrollToPreviousCard(rowRef, 4)}>&lt;</button>
            </div>
            <div className="col-10">
                <div className="row flex-nowrap overflow-auto" ref={rowRef}>
                    {array.map((item, index) => (
                        <Character key={index} copyRightHTML={item.copyRightHTML} id={item.id}
                                   name={item.name} description={item.description}
                                   imageSource={item.imageSource} type={item.type}/>
                    ))}
                </div>
            </div>
            <div className="col text-center d-flex justify-content-start align-items-center">
                <button className="btn" onClick={() => scrollToNextCard(rowRef, 4)}>&gt;</button>
            </div>
        </div>
    ) : (
        <p className="text-center">Loading data...</p>
    ))
}

export default Characters;