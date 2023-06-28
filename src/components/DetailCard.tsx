import DetailsProps from "../interfaces/DetailsProps.tsx";
import 'animate.css';
import React from "react";

const DetailCard: React.FC<DetailsProps> = ({copyRightHTML, title, description, imageSource}) => {
    return (
        <div className="col-md-4 d-flex animate__animated animate__fadeIn">
            <div className="card">
                <img src={imageSource} className="card-img-top" alt={title}></img>
                <div className="card-body">
                    <h5 className="card-title text-center">{title}</h5>
                    <p className="card-text">{description}</p>
                </div>
                <small className="card-footer" dangerouslySetInnerHTML={{__html: copyRightHTML}}/>
            </div>
        </div>
    )
};

export default DetailCard;