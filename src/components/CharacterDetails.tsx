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
        <div className="container-fluid">
            <div style={{marginLeft: "50px"}}>
                <h5 className="backToLink"><a style={{textDecoration: "none"}} href="javascript:window.history.back()"
                                              className="link-light backToLink mb-5">&lt; Back to characters</a>
                </h5>
            </div>
            {entries.map(([key, value]) => <DetailCardContainer array={value} header={key}/>)}
        </div>
    );
}

export default CharacterDetails;