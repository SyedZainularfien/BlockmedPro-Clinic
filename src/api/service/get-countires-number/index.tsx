import axios from 'axios';

export type Country = {
  name: string;
  code: string;
  flag: string;
};

export const fetchCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,idd,flags');

    return response.data
      ?.map((country: any) => ({
        name: country.name.common,
        code: country.idd?.root + (country.idd?.suffixes?.[0] || ''),
        flag: country.flags?.svg || country.flags?.png,
      }))
      .filter((c: Country) => c.code && c.flag && !['Antarctica', 'Heard Island and McDonald Islands'].includes(c.name))
      .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error fetching country data:', error);
    return [];
  }
};
