export interface GameOption {
    level: string;
    value: number;
    description: string;
}

export const gameOptions: GameOption[] = [
    {
        level: "Easy",
        value: 4,
        description: "4 Cards",
    },
    {
        level: "Normal",
        value: 8,
        description: "8 Cards",
    },
    {
        level: "Hard",
        value: 12,
        description: "12 Cards",
    },
];
