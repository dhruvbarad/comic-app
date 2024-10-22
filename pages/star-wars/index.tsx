import React, {useState} from "react";
import Characters, {CharacterProps} from "../../components/Characters";

export default function StarWars() {
    const [starWarsCharacters, setStarWarsCharacters] = useState<CharacterProps[]>([]);

    React.useEffect(() => {
        fetch(`/api/star-wars`)
            .then((res) => res.json())
            .then((data: any) => setStarWarsCharacters(data.characters))
            .catch((err) => console.log("Error fetching data" + err))
            .finally(() => console.log("Results received from Server"));
    }, []);
    return (
        <Characters header='Star Wars' array={starWarsCharacters}/>
    )
}
