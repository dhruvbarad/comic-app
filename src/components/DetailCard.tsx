import React from "react";

export interface DetailsProps {
    copyRightHTML: string;
    title: string;
    descriptions: string[];
    imageSource: string;

}

const DetailCard = ({copyRightHTML, title, descriptions, imageSource}: DetailsProps) => {
    return (
        <div className="col-md-4 d-flex">
            <div className="card">
                {imageSource !== "" ? (
                    <img src={imageSource} className="card-img-top" alt={title}></img>
                ) : (
                    <></>
                )}
                <div className="card-body">
                    <h5 className="card-title text-center">{title}</h5>
                    {descriptions.map((description) => (
                        <p className="card-text text-center">{description}</p>
                    ))}
                </div>
                <small className="card-footer" dangerouslySetInnerHTML={{__html: copyRightHTML}}/>
            </div>
        </div>
    )
};

export default DetailCard;
