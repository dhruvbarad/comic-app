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
        <div className="container">
            <div className={`row flex justify-content-center flex-wrap ${header === "" ? "" : "mt-5"} mb-5`}>
                <h3 className="text-center">{header}</h3>
                {array.map((item) => (
                    <div key={item.imageSource} className="col-md-4 d-flex">
                        <div className="card">
                            <img src={item.imageSource} className="card-img-top" alt={item.name}></img>
                            <div className="card-body">
                                <h5 className="card-title text-center">{item.name}</h5>
                                {item.descriptions.map((description, index) => (
                                    <p key={index}>{description}</p>  // You can use <p> or another wrapper element
                                ))}
                            </div>
                            <small className="card-footer" dangerouslySetInnerHTML={{__html: item.copyRightHTML}}/>
                            <a type='button' className="btn" href={`/${item.type}/${item.id}`}>Click for character&#39;s
                                details</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Characters;
