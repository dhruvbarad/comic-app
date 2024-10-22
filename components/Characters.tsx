import {it} from "node:test";

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
    return (
        <div className="mx-6">
            <h3 className="text-center">{header}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {array.map((item) => (
                    <div className={`${item.type} ${item.type}-box-shadow flex flex-col h-full overflow-hidden mb-12`}>
                        <img
                            className="w-full p-2"
                            src={item.imageSource}
                            alt="Placeholder Image"
                        />
                        <div className="px-2 flex flex-col flex-grow">
                            <div className="card-title font-bold text-xl mb-2 text-center bg-blue-600">{item.name}</div>
                            {item.descriptions.map((description, index) => (
                                <p key={index} className="text-base flex-grow">{description}</p>
                            ))}
                        </div>
                        <small className="px-2 mt-2 mb-2 text-gray-500" dangerouslySetInnerHTML={{__html: item.copyRightHTML}}/>
                        <button className="font-bold rounded bg-white text-black">
                            Button
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Characters;
