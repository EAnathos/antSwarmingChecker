import fs from 'fs';
import path from 'path';

let speciesByRegion: Record<string, string[]> = {};
let speciesByDate: Record<string, string[]> = {};

export const loadData = () => {
  const regionDataPath = path.join('./data', 'species_by_region.json');
  const dateDataPath = path.join('./data', 'species_by_date.json');

  const regionData = fs.readFileSync(regionDataPath, 'utf-8');
  speciesByRegion = JSON.parse(regionData);
  for (const region in speciesByRegion) {
    speciesByRegion[region].sort();
  }

  const dateData = fs.readFileSync(dateDataPath, 'utf-8');
  speciesByDate = JSON.parse(dateData);
  for (const month in speciesByDate) {
    speciesByDate[month].sort();
  }
};

export const getSpeciesByRegion = (region: string): string[] => {
  return speciesByRegion[region] || [];
};

export const getSpeciesByDate = (month: string): string[] => {
  return speciesByDate[month.toLowerCase()] || [];
};

export const addSpecieByDate = (month: string, specie: string) => {
  month = month.toLowerCase();

  if (!speciesByDate[month]) {
    speciesByDate[month] = [];
  }

  speciesByDate[month].push(specie);
  speciesByDate[month].sort();

  dateDataSave();
}

export const removeSpecieByDate = (month: string, specie: string) => {
  month = month.toLowerCase();

  if (!speciesByDate[month]) {
    return;
  }

  speciesByDate[month] = speciesByDate[month].filter(s => s !== specie);
  speciesByDate[month].sort();

  dateDataSave();
}

export const dateDataSave = () => {
  const dateDataPath = path.join('./data', 'species_by_date.json');
  fs.writeFileSync(dateDataPath, JSON.stringify(speciesByDate, null, 2));
}
