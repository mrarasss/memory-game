import React, { useEffect, useState } from "react";
import "./card.scss";

interface CardProps {
    value: number,
    handleClick: (value: number) => void,
    restart: boolean,
    gameStarted: boolean
}

export default function Card({ value, handleClick, restart, gameStarted }: CardProps) {
    const [cardOpen, setCardOpen] = useState<boolean>(true);

    // close the card is game started and open if restart button clicked
    useEffect(() => {
        if (restart) setCardOpen(true);
        if (gameStarted) setCardOpen(false);
    }, [restart, gameStarted]);

    function handleOnClick() {
        if (!cardOpen && gameStarted) handleClick(Number(value));
        setCardOpen(true);
    }

    return (
        <div className="card" onClick={() => handleOnClick()}>
            <div className={`card-container ${cardOpen ? "open" : ""}`}>
                {cardOpen ? (
                    <div className="card-front">{value}</div>
                ) : (
                        <div className="card-back">Memory Game</div>
                    )}
            </div>
        </div>
    );
}
