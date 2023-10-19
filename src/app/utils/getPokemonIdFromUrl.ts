export function getPokemonIdFromUrl(url: string): number {
    const regex = /\/(\d+)\/?$/;
    const value = url.match(regex);

    if (value && value[1]) {
        return parseInt(value[1], 10);
    }

    return -1;
}
