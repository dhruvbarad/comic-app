import {useRouter} from "next/router";

export interface CharacterProps {
    copyRightHTML: string;
    id: number;
    name: string;
    descriptions: string[];
    imageSource: string;
    type: string;
}

interface CharactersProps {
    header: string;
    array: CharacterProps[];
}

const Characters = ({array, header}: CharactersProps) => {
    if (!array) {
        return <p>Loading...</p>; // Or null
    }
    const navigate = useRouter();
    return (
        <div className="m-6">
            <p className="text-xl text-center">{header}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {array.map((item) => (
                    <div className={`${item.type} ${item.type}-box-shadow flex flex-col h-full overflow-hidden mb-12 p-3`}>
                        <img
                            className="w-full"
                            src={item.imageSource}
                            alt={item.name}
                        />
                        <div className="flex flex-col flex-grow">
                            <div className="card-title font-bold text-xl mb-2 text-center">{item.name}</div>
                            {item.descriptions.map((description, index) => (
                                <p key={index} className="text-base flex-grow">{description}</p>
                            ))}
                        </div>
                        <small className="text-gray-500"
                               dangerouslySetInnerHTML={{__html: item.copyRightHTML}}/>
                        <button onClick={() => navigate.push(`/${item.type}/${item.id}`)}
                                className="rounded bg-white">
                            Click for character's details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Characters;
