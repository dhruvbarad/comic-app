import React from "react";
import {useRouter} from 'next/router';
import CharacterDetails from "@/components/CharacterDetails";

export default function StarWarsCharacter() {
    const router = useRouter();
    const {id} = router.query;

    return (
        <CharacterDetails id={Number(id)} characterType='star-wars'></CharacterDetails>
    )
}
