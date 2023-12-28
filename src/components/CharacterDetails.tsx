import React, {useState} from "react";
import DetailCardContainer from "./DetailCardContainer.tsx";

interface CharacterDetailsProps {
    id: number;
    characterType: string;
}

const CharacterDetails = ({characterType, id}: CharacterDetailsProps) => {
    const [characterDetails, setCharacterDetails] = useState<Object>({});

    React.useEffect(() => {
        fetch(`https://us-central1-comic-app-50173.cloudfunctions.net/app/${characterType}/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setCharacterDetails(data);
            })
            .catch((err) => console.log("Error fetching data" + err))
            .finally(() => console.log("Results received from Server"));
    }, []);

    const entries = Object.entries(characterDetails)
    return (
        <div className={`container-fluid ${characterType}`}>
            <h5><a className="link-light" onClick={() => window.history.back()}>&lt; Back to characters</a></h5>
            {entries.map(([key, value]) => <DetailCardContainer array={value} header={key}/>)}
        </div>
    );
}

export default CharacterDetails;