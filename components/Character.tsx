import {useRouter} from "next/router";

const Character = ({details}: Record<string, any>) => {
    if (details.id === undefined) {
        return <p>Loading...</p>; // Or null
    }
    const navigate = useRouter();
    return (
        <div className={`${details.type} ${details.type}-box-shadow flex flex-col overflow-hidden mb-12 p-3`}>
            <img className="w-full" src={details.image.url} alt={details.name}/>
            <div className="flex flex-col py-2">
                <button onClick={() => navigate.push(`/${details.type}/${details.id}`)} className="rounded card-title font-bold text-xl mb-2 text-center">
                    {details.name}
                </button>
            </div>
            <small className="text-gray-500" dangerouslySetInnerHTML={{__html: details.copyRightHTML}}/>
        </div>
    );
};

export default Character;
