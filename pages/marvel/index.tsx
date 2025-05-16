import React, {useState} from "react";
import Character, {CharacterProps} from "@/components/Character";

export default function Marvel() {
  const [marvelCharacters, setMarvelCharacters] = useState<CharacterProps[]>([]);

  React.useEffect(() => {
    fetch(`/api/marvel`)
      .then((res) => res.json())
      .then((data: any) => setMarvelCharacters(data))
      .catch((err) => console.log("Error fetching data" + err))
      .finally(() => console.log("Results received from Server"));
  }, []);

  return (
    <div className="m-6">
      <p className="text-xl text-center">Marvel</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {marvelCharacters.map((item) => (
          <Character
            id={item.id}
            name={item.name}
            descriptions={item.descriptions}
            imageSource={item.imageSource}
            type='marvel'
            copyRightHTML={item.copyRightHTML}
          />
        ))}
      </div>
    </div>
  );
}
