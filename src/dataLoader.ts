import fs from 'fs';
import path from 'path';

let speciesByRegion: Record<string, string[]> = {};
let speciesByDate: Record<string, string[]> = {};

export const loadData = () => {
  const regionDataPath = path.join('./data', 'species_by_region.json');
  const dateDataPath = path.join('./data', 'species_by_date.json');

  const regionData = fs.readFileSync(regionDataPath, 'utf-8');
  speciesByRegion = JSON.parse(regionData);

  const dateData = fs.readFileSync(dateDataPath, 'utf-8');
  speciesByDate = JSON.parse(dateData);
};

export const getSpeciesByRegion = (region: string): string[] => {
  return speciesByRegion[region] || [];
};

export const getSpeciesByDate = (month: string): string[] => {
  return speciesByDate[month.toLowerCase()] || [];
};

export const addSpecieByDate = (month: string, specie: string) => {
  const monthLower = month.toLowerCase();

  if (!speciesByDate[monthLower]) {
    speciesByDate[monthLower] = [];
  }

  speciesByDate[monthLower].push(specie);

  dateDataSave();
}

export const removeSpecieByDate = (month: string, specie: string) => {
  const monthLower = month.toLowerCase();

  if (!speciesByDate[monthLower]) {
    return;
  }

  speciesByDate[monthLower] = speciesByDate[monthLower].filter(s => s !== specie);

  dateDataSave();
}

export const dateDataSave = () => {
  const dateDataPath = path.join('./data', 'species_by_date.json');
  fs.writeFileSync(dateDataPath, JSON.stringify(speciesByDate));
}
