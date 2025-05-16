import React, { useState } from "react";
import Character, {CharacterProps} from "@/components/Character";

export default function Dc() {
  const [dcCharacters, setDcCharacters] = useState<CharacterProps[]>([]);

  React.useEffect(() => {
    fetch(`/api/dc`)
      .then((res) => res.json())
      .then((data: any) => setDcCharacters(data))
      .catch((err) => console.log("Error fetching data" + err));
  }, []);

  return (
    <div className="m-6">
      <p className="text-xl text-center">DC</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {dcCharacters.map((item) => (
          <Character
            id={item.id}
            name={item.name}
            descriptions={item.descriptions}
            imageSource={item.imageSource}
            type='dc'
            copyRightHTML={item.copyRightHTML}
          />
        ))}
      </div>
    </div>
  );
}
