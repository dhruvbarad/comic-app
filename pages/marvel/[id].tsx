import React, {useState} from "react";
import {useRouter} from "next/router";
import CharacterDetails from "@/components/CharacterDetails";

export default function MarvelCharacter() {
    const router = useRouter();
    const {id} = router.query;
    const [details, setDetails] = useState<any>({});

    React.useEffect(() => {
        fetch(`/api/marvel/${id}`)
            .then((res) => res.json())
            .then((data: any) => setDetails(data))
            .catch((err) => console.log("Error fetching data" + err));
    }, [id]);

    return (
        <div className={`marvel m-6`}>
            <CharacterDetails details={details}/>
        </div>
    );
}
