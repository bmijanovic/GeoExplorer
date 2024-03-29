export interface Country {
    common_name: string,
    flag_png: string,
    flag_alt: string,
    coat_of_arm: string,
    capital: string,
    continents: string[],
    population: number,
    area: number,
    timezones: string[],
    languages: any,
    is_independent: boolean,
    status: string,
    borders: string[],
    map_relation_id: number
}
