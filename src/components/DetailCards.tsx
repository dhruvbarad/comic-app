import DetailCard, {DetailsProps} from "./DetailCard.tsx";
import {RefObject, useRef} from "react";
import {scrollToPreviousCard, scrollToNextCard} from "../utils/util.ts";


interface DetailCardsProps {
    array: DetailsProps[],
    header: string,
}

const DetailCards = ({array, header}: DetailCardsProps) => {
    const rowRef: RefObject<HTMLDivElement> = useRef(null);
    return (
        array ? (
            <div className="row mb-5 animate__animated animate__fadeIn">
                <h3 className="text-center">{header}</h3>
                <div className="row">
                    <div className="col text-center d-flex justify-content-end align-items-center">
                        <button className="btn float-end" onClick={() => scrollToPreviousCard(rowRef, 3)}>&lt;</button>

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
                        <button className="btn" onClick={() => scrollToNextCard(rowRef, 3)}>&gt;</button>
                    </div>
                </div>
            </div>
        ) : (
            <p className="text-center">Loading data...</p>
        ))
}

export default DetailCards;