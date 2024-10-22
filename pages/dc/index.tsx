import React, {useState} from "react";
import Characters, {CharacterProps} from "../../components/Characters";

export default function Dc() {
    const [dcCharacters, setDcCharacters] = useState<CharacterProps[]>([]);

    React.useEffect(() => {
        fetch(`/api/dc`)
            .then((res) => res.json())
            .then((data: any) => setDcCharacters(data.characters))
            .catch((err) => console.log("Error fetching data" + err))
    }, []);
    return (
        <Characters header='DC' array={dcCharacters}/>
    )
}
