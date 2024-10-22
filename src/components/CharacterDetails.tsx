import React, {RefObject, useRef, useState} from "react";
import {scrollToNextCard, scrollToPreviousCard} from "@/utils/scroll";

interface CharacterDetailsProps {
    id: number;
    characterType: string;
}

const CharacterDetails = ({characterType, id}: CharacterDetailsProps) => {
    const [characterDetails, setCharacterDetails] = useState<object>([]);
    const rowRef: RefObject<HTMLDivElement> = useRef(null);

    React.useEffect(() => {
        fetch(`/api/${characterType}/${id}`)
            .then((res) => res.json())
            .then((data: any) => setCharacterDetails(data))
            .catch((err) => console.log("Error fetching data" + err))
            .finally(() => console.log("Results received from Server"));
    }, [characterType, id]);

    if (!characterDetails || isNaN(id)) {
        return <p className="text-center">Loading data...</p>
    }

    return (
        <>
            {Object.entries(characterDetails).map(([key, value]) =>
                <div key={key}>
                    <div className="row justify-content-center">
                        <h3 className="text-center">{key}</h3>
                        <div className="row">
                            <div className="col text-center d-flex justify-content-end align-items-center">
                                <button className="btn float-end"
                                        onClick={() => scrollToPreviousCard(rowRef, 3)}>&lt;</button>
                            </div>
                            <div className="col-10">
                                <div className="row flex-nowrap overflow-auto" ref={rowRef}>
                                </div>
                            </div>
                            <div className="col text-center d-flex justify-content-start align-items-center">
                                <button className="btn" onClick={() => scrollToNextCard(rowRef, 3)}>&gt;</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CharacterDetails;
