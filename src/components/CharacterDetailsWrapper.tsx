import {useParams} from "react-router-dom";
import CharacterDetails from "./CharacterDetails";

interface ComicWrapper {
    characterType: string;
}

const CharacterDetailsWrapper = ({characterType}: ComicWrapper) => {
    const params = useParams();
    return <CharacterDetails id={parseInt(params.id as string)}
                             characterType={characterType}/>;
};

export default CharacterDetailsWrapper;