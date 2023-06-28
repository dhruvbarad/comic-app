import DetailCard from "./DetailCard.tsx";
import React, {RefObject, useRef} from "react";
import DetailContainerProps from "../interfaces/DetailContainerProps.tsx";

const DetailCardContainer: React.FC<DetailContainerProps> = ({array, header}) => {
    const rowRef: RefObject<HTMLDivElement> = useRef(null);
    const scrollToNextCard = () => {
        if (rowRef.current) {
            rowRef.current.scrollBy({
                left: rowRef.current.offsetWidth / 3,
                behavior: 'smooth',
            });
        }
    };
    const scrollToPreviousCard = () => {
        if (rowRef.current) {
            rowRef.current.scrollBy({
                left: -rowRef.current.offsetWidth / 3,
                behavior: 'smooth',
            });
        }
    };
    return (
        array ? (
            <div className="mb-5">
                <h3 className="text-center">{header}</h3>
                <div className="row">
                    <div className="col text-center d-flex justify-content-end align-items-center">
                        <button className="btn float-end" onClick={scrollToPreviousCard}>&lt;</button>
                    </div>
                    <div className="col-10">
                        <div className="row flex-nowrap overflow-auto" ref={rowRef}>
                            {array.map((item, index) => (
                                <DetailCard key={index} copyRightHTML={item.copyRightHTML} title={item.title}
                                            description={item.description} imageSource={item.imageSource}/>

                            ))}
                        </div>
                    </div>
                    <div className="col text-center d-flex justify-content-start align-items-center">
                        <button className="btn" onClick={scrollToNextCard}>&gt;</button>
                    </div>
                </div>
            </div>
        ) : (
            <p className="text-center">Loading data...</p>
        ))
}

export default DetailCardContainer;