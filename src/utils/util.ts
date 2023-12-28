import {RefObject} from "react";

export const splitIntoRows = (allCards: any[] | null, charactersPerRow: number) => {
    const rows: any[][] = [];
    if (allCards) {
        for (let i = 0; i < allCards.length; i += charactersPerRow) {
            const row = allCards.slice(i, i + charactersPerRow);
            rows.push(row);
        }
        return rows;
    }
};
export const scrollToNextCard = (ref: RefObject<HTMLDivElement>) => {
    if (ref.current) {
        ref.current.scrollBy({
            left: ref.current.offsetWidth / 3,
            behavior: 'smooth',
        });
    }
};

export const scrollToPreviousCard = (ref: RefObject<HTMLDivElement>) => {
    if (ref.current) {
        ref.current.scrollBy({
            left: -ref.current.offsetWidth / 3,
            behavior: 'smooth',
        });
    }
};