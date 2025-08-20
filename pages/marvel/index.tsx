import React, {useState} from "react";
import Character from "@/components/Character";

export default function StarWars() {
    const [marvelCharacters, setMarvelCharacters] = useState<any>([]);

    React.useEffect(() => {
        fetch(`/api/marvel`)
            .then((res) => res.json())
            .then((data: any) => setMarvelCharacters(data))
            .catch((err) => console.log("Error fetching data" + err))
            .finally(() => console.log("Results received from Server"));
    }, []);

    return (
        <div className="m-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {marvelCharacters.map((item: unknown) => (
                    <Character details={item}/>
                ))}
            </div>
        </div>
    );
}
