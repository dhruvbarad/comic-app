import {useRouter} from "next/router";

export interface CharacterProps {
  copyRightHTML: string;
  id: number;
  name: string;
  descriptions: string[];
  imageSource: string;
  type: string;
}

const Character = ({
                    copyRightHTML,
                     id,
                     name,
                     descriptions,
                     imageSource,
                     type
                   }: CharacterProps) => {
  if (!id) {
    return <p>Loading...</p>; // Or null
  }
  const navigate = useRouter();
  return (
    <div className={`${type} ${type}-box-shadow flex flex-col h-full overflow-hidden mb-12 p-3`}>
      <img className="w-full" src={imageSource} alt={name}/>
      <div className="flex flex-col flex-grow">
        <div className="card-title font-bold text-xl mb-2 text-center">
          {name}
        </div>
        {descriptions.map((description, index) => (
          <p key={index} className="text-base flex-grow">
            {description}
          </p>
        ))}
      </div>
      <small
        className="text-gray-500"
        dangerouslySetInnerHTML={{__html: copyRightHTML}}
      />
      <button
        onClick={() => navigate.push(`/${type}/${id}`)}
        className="rounded bg-white"
      >
        Click for character's details
      </button>
    </div>
  );
};

export default Character;
