export interface PokeApiList {
    count: number,
    results: PokeApiListItem[]
}

export interface PokeApiListItem {
    name: string,
    url: string
}
