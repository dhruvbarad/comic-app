import React from "react";
import Character, {CharacterProps} from "./Character";
import 'animate.css';

interface CharactersProps {
    header: string;
    characterType: string;
    array: CharacterProps[];
}

const Characters = ({array, header, characterType}: CharactersProps) => {
    return (array.length > 0 ? (
        <div className={`container ${characterType} animate__animated animate__fadeIn`}>
            <div className={`row flex justify-content-center flex-wrap ${header === "" ? "" : "mt-5"} mb-5`}>
                <h3 className="text-center">{header}</h3>
                        {array.map((item, index) => (
                            <Character key={index} copyRightHTML={item.copyRightHTML} id={item.id}
                                       name={item.name} description={item.description}
                                       imageSource={item.imageSource} type={item.type}/>
                        ))}
            </div>
        </div>
    ) : (
        <p className="text-center">Loading data...</p>
    ))
}

export default Characters;