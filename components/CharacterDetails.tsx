import React from "react";

export type CharacterDetailsProps = Record<string, any>

const CharacterDetails = ({details}: CharacterDetailsProps) => {
    if (details == undefined) {
        return <p>Loading...</p>; // Or null
    }
    return (
        <div className='m-6'>
            {Object.keys(details).map((category) => (
                <div key={category}>
                    <p className="text-xl text-center">{category}</p>
                    <div className="flex justify-center items-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                            {Object.values(details[category]).map((item: any, itemIndex) => (
                                <div key={itemIndex}
                                     className={`box-shadow flex flex-col h-full overflow-hidden mb-12 p-3`}>
                                    {item.imageSource ?
                                        <img className="w-full" src={item.imageSource} alt={item.title}/>
                                        : ""
                                    }
                                    <p className={`text-center text-lg card-title`}>{item.title}</p>
                                    <div className="flex flex-col flex-grow">
                                        {item.descriptions?.map((description : string, index : number) => (
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
