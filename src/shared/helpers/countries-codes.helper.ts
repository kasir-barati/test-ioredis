import * as countries from '@statics/json/countries.json';

export function countriesCodes(whichCode: '2cca' | '5cca'): string[] {
    return whichCode === '2cca'
        ? countries.map((country) => country.id)
        : countries.map((country) => country.cca5);
}
