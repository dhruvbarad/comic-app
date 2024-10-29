import React, {useState} from "react";
import {useRouter} from 'next/router';
import CharacterDetails from "../../components/CharacterDetails";

export default function DcCharacter() {
    const router = useRouter();
    const {id} = router.query;
    const [details, setDetails] = useState<{[key: string]: any[]}>({});

    React.useEffect(() => {
        fetch(`/api/dc/${id}`)
            .then((res) => res.json())
            .then((data: any) => setDetails(data))
            .catch((err) => console.log("Error fetching data" + err))
    }, [id]);

    return (
        <CharacterDetails details={details} type='dc'></CharacterDetails>
    )
}