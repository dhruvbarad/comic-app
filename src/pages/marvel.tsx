import React, {useState} from "react";
import {CharacterProps} from "@/components/Characters";
import Characters from "@/components/Characters";

export default function Marvel() {
    const [marvelCharacters, setMarvelCharacters] = useState<CharacterProps[]>([]);

    React.useEffect(() => {
        fetch(`/api/marvel`)
            .then((res) => res.json())
            .then((data: any) => setMarvelCharacters(data.characters))
            .catch((err) => console.log("Error fetching data" + err))
            .finally(() => console.log("Results received from Server"));
    }, []);
    return (
        <Characters header='Marvel' array={marvelCharacters}/>
    )
}
