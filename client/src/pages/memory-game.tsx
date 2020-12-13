import React, { useEffect, useState } from "react";
import Card from "../components/card/card";
import GameOptions from "../components/games/game-options";
import request from "../utils/request";
import "./memory-game.scss";

export default function MemoryGame() {
    const [randomNumbers, setRandomNumbers] = useState<number[] | null>(null);
    const [selectedNumbers, setSelectedNumbers] = useState<number[] | null>(null);
    const [gameCompleted, setGameCompleted] = useState<boolean>(false);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [restart, setRestart] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    // set the game completed, listen each click or data change
    useEffect(() => {
        if (
            randomNumbers &&
            selectedNumbers &&
            randomNumbers.length === selectedNumbers.length
        )
            setGameCompleted(true);
    }, [selectedNumbers, randomNumbers]);

    function handleClick(value: number) {
        setSelectedNumbers((prevState) => {
            if (prevState) return [...prevState, value];
            return [value];
        });
    }

    // check whether the number ascending
    function areSelectedNumbersAscending() {
        if (!selectedNumbers) return false;

        let isAscending = true;
        let minimumNumber = selectedNumbers[0];

        for (let i = 1; i < selectedNumbers.length; i++) {
            if (selectedNumbers[i] > minimumNumber) {
                minimumNumber = selectedNumbers[i];
            } else {
                isAscending = false;
                break;
            }
        }

        return isAscending;
    }

    // reset game
    function resetGame() {
        setSelectedNumbers([]);
        setGameCompleted(false);
        setRestart(true);
        setGameStarted(false);
    }

    // start game
    function startGame() {
        setGameStarted(true);
        setRestart(false);
        setGameCompleted(false);
    }

    // make the request to the backend with the number of the card requested
    function handleSelectGame(value: number) {
        setLoading(true);
        setError(null);
        request.get(`/game/card/${value}`)
            .then((res) => setRandomNumbers(res.data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }

    return (
        <div className="container">
            <GameOptions handleClick={handleSelectGame} />
            {isLoading && (
                <p>Loading</p>
            )}
            {!isLoading && !error && (
                <>
                    <div className="container-cards">
                        {randomNumbers && randomNumbers.map((randomNumber, index) => (
                            <Card
                                key={index}
                                handleClick={handleClick}
                                value={randomNumber}
                                gameStarted={gameStarted}
                                restart={restart} />
                        ))}
                    </div><div className="container-result">
                        {gameCompleted &&
                            (areSelectedNumbersAscending() ? (
                                <h3>Win the game</h3>
                            ) : (
                                    <h3>Lost the game</h3>
                                ))}
                    </div>
                    <div className="container-actions">
                        <button disabled={!randomNumbers} onClick={() => resetGame()}>Restart</button>
                        <button disabled={gameStarted || !randomNumbers} onClick={() => startGame()}>Play</button>
                    </div>
                </>
            )}
        </div>
    );
}
