import CharacterProps from "../interfaces/CharacterProps.tsx";
import 'animate.css';

const Character = ({copyRightHTML, id, name, description, imageSource, type}: CharacterProps) => {
    return (
        <div className="col-md-4 d-flex animate__animated animate__fadeIn">
            <div className="card">
                <img src={imageSource} className="img-fluid rounded-start" alt={name}></img>
                <div className="card-body">
                    <h5 className="card-title text-center">{name}</h5>
                    <p className="card-text">{description}</p>
                </div>
                <small className="card-footer" dangerouslySetInnerHTML={{__html: copyRightHTML}}/>
                <a type='button' className="btn" href={`https://comic-app-50173.web.app/${type}/${id}`}>Click for character's details</a>
            </div>
        </div>
    )

};
export default Character;
