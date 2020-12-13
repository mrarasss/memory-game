import React from 'react';

interface GameOptionsProps {
    value: number,
    label: string,
    handleClick: (value: number) => void,
    description: string
}

export default function GameOption({ value, label, handleClick, description }: GameOptionsProps) {
    return (
        <div className="navigation-item" onClick={() => handleClick(value)}>
            <h3>{label}</h3>
            <p>{description}</p>
        </div>
    )
}