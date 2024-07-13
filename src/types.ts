// src/types.ts

export interface Game {
    id: number;
    title: string;
    iconURL: string;
    rating: number;
}

export interface GameDetails extends Game {
    bannerURL: string;
    description: string;
}