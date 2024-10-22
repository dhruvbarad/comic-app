import React, {useState} from "react";
import {CharacterProps} from "@/components/Characters";
import Characters from "@/components/Characters";

export default function Dc() {
    const [dcCharacters, setDcCharacters] = useState<CharacterProps[]>([]);

    React.useEffect(() => {
        fetch(`/api/dc`)
            .then((res) => res.json())
            .then((data: any) => setDcCharacters(data.characters))
            .catch((err) => console.log("Error fetching data" + err))
            .finally(() => console.log("Results received from Server"));
    }, []);
    return (
        <Characters header='DC' array={dcCharacters}/>
    )
}
