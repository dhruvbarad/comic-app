export interface DetailsProps {
    copyRightHTML: string;
    title: string;
    description: string;
    imageSource: string;

}

const DetailCard = ({copyRightHTML, title, description, imageSource}: DetailsProps) => {
    return (
        <div className="col-md-4 d-flex">
            <div className="card">
                <img src={imageSource} className="card-img-top" alt={title}></img>
                <div className="card-body">
                    <h5 className="card-title text-center">{title}</h5>
                    <p className="card-text" dangerouslySetInnerHTML={{__html: description}}/>
                </div>
                <small className="card-footer" dangerouslySetInnerHTML={{__html: copyRightHTML}}/>
            </div>
        </div>
    )
};

export default DetailCard;
