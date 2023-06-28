import React, {useState} from "react";
import CharacterDetailsProps from "../interfaces/CharacterDetailsProps.tsx";
import 'animate.css';
import DetailCardContainer from "./DetailCardContainer.tsx";

const CharacterDetails = ({id, characterType}: CharacterDetailsProps) => {
    const [characterDetails, setCharacterDetails] = useState<Object>({});

    React.useEffect(() => {
        fetch(`/${characterType}/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setCharacterDetails(data);
            })
            .finally(() => console.log("Results received from Server"));
    }, []);

    const entries = Object.entries(characterDetails)
    const render = () => entries.forEach(([key, value]) => {
        console.log(`${key}: ${value}`)
    })
    render();
    return (
        <>
            <h5><a style={{textDecoration: "none"}} id="backToLink" href="javascript:window.history.back()"
                   className="link-light">&lt; Back to
                characters</a></h5>
            {entries.map(([key, value]) => <DetailCardContainer array={value} header={key}/>)}
        </>
    );
}

export default CharacterDetails;