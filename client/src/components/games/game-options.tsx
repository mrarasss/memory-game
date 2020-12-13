import React from "react";
import { gameOptions } from "../../interfaces/game-option";
import GameOption from "./game-options-item";
import "./game-options.scss";

interface GameOptionsProps {
    handleClick: (value: number) => void;
}

export default function GameOptions({ handleClick }: GameOptionsProps) {
    return (
        <div className="navigation">
            {gameOptions.map((gameOption, index) => (
                <GameOption
                    key={index}
                    value={gameOption.value}
                    description={gameOption.description}
                    handleClick={handleClick}
                    label={gameOption.level}
                />
            ))}
        </div>
    );
}
