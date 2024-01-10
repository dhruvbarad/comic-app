import React, {useState} from "react";
import DetailCards from "./DetailCards.tsx";

interface CharacterDetailsProps {
    id: number;
    characterType: string;
}

const CharacterDetails = ({characterType, id}: CharacterDetailsProps) => {
    const [characterDetails, setCharacterDetails] = useState<Object>({});

    React.useEffect(() => {
        fetch(`https://us-central1-comic-app-50173.cloudfunctions.net/app/${characterType}/${id}`)
            .then((res) => res.json())
            .then((data) => setCharacterDetails(data))
            .catch((err) => console.log("Error fetching data" + err))
            .finally(() => console.log("Results received from Server"));
    }, []);

    const entries = Object.entries(characterDetails)
    return (
        <div className={`container-fluid ${characterType} animate__animated animate__fadeIn`}>
            <h5 className="p-4"><a className="link-light" onClick={() => window.history.back()}>&lt; Back to characters</a></h5>
            {entries.length > 0 ? (
                entries.map(([key, value]) =>
                    <DetailCards array={value} header={key}/>
                )
            ) : (
                <p className="text-center">Loading data...</p>
            )}
        </div>
    );
}

export default CharacterDetails;