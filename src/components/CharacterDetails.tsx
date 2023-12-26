import React, {useState} from "react";
import CharacterDetailsProps from "../interfaces/CharacterDetailsProps.tsx";
import 'animate.css';
import DetailCardContainer from "./DetailCardContainer.tsx";

const CharacterDetails = ({characterType, id}: CharacterDetailsProps) => {
    const [characterDetails, setCharacterDetails] = useState<Object>({});

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://us-central1-comic-app-50173.cloudfunctions.net/app/${characterType}/${id}`);
                if (!response.ok) {
                    console.error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setCharacterDetails(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData().then(() => console.log("Fetched successfully"));
    }, [characterType, id]);

    const entries = Object.entries(characterDetails)
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