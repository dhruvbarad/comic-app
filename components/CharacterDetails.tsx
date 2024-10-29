import React from "react";

interface CharacterDetailsProps {
    details: { [key: string]: any[] };
    type: string;
}

const CharacterDetails = ({details, type}: CharacterDetailsProps) => {
    if (!details) {
        return <p>Loading...</p>; // Or null
    }
    return (
        <div className={`${type} m-6`}>
            {Object.keys(details).map((category) => (
                <div key={category}>
                    <p className="text-xl text-center">{category}</p>
                    <div className="flex items-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                            {Object.values(details[category]).map((item, itemIndex) => (
                                <div key={itemIndex}
                                     className={`${type}-box-shadow flex flex-col h-full overflow-hidden mb-12 p-3`}>
                                    <img className="w-full" src={item.imageSource} alt={item.title}/>
                                    <p className={`text-center text-lg card-title`}>{item.title}</p>
                                    <div className="flex flex-col flex-grow">
                                        {item.descriptions?.map((description, index) => (
                                            <p key={index} className="text-base flex-grow">
                                                {description}
                                            </p>
                                        ))}
                                    </div>
                                    <small
                                        className="text-gray-500"
                                        dangerouslySetInnerHTML={{__html: item.copyRightHTML}}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CharacterDetails;
