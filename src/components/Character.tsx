export interface CharacterProps {
    copyRightHTML: string;
    id: number;
    name: string;
    description: string;
    imageSource: string;
    type: string;
}

const Character = ({copyRightHTML, id, name, description, imageSource, type}: CharacterProps) => {
    return (
        <div className="col-md-3 d-flex">
            <div className="card">
                <img src={imageSource} className="card-img-top" alt={name}></img>
                <div className="card-body">
                    <h5 className="card-title text-center">{name}</h5>
                    <p className="card-text">{description}</p>
                </div>
                <small className="card-footer" dangerouslySetInnerHTML={{__html: copyRightHTML}}/>
                <a type='button' className="btn" href={`/${type}/${id}`}>Click for character's details</a>
            </div>
        </div>
    )

};
export default Character;
