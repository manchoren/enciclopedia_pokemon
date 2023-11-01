export interface Pokemon {
    name: string;
    id: number;
    height: number;
    weight: number;
    types: PokemonType[];
    abilities: PokemonAbility[];
    stats: PokemonStat[];
}

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonAbility {
    slot: number;
    is_hidden: boolean;
    ability: {
        name: string;
        url: string;
    };
}

export interface PokemonStat {
    stat: {
        name: string;
        url: string;
    };
    effort: number;
    base_stat: number;
}
