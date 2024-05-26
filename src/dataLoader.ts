import fs from 'fs';
import path from 'path';

let speciesByRegion: Record<string, string[]> = {};
let speciesByDate: Record<string, string[]> = {};

/**
 * Load data from JSON files and initialize the speciesByRegion and speciesByDate objects.
 * This function also sorts the species lists in each region and date after loading.
 */
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

  regionDataSave();
  dateDataSave();
};

/**
 * Get the list of species for a given region.
 *
 * @param {string} region - The name of the region.
 * @returns {string[]} The list of species in the specified region.
 */
export const getSpeciesByRegion = (region: string | null): string[] | null => {
  if (!region) {
    return null;
  }

  return speciesByRegion[region] || [];
};

/**
 * Get the list of species for a given month.
 *
 * @param {string} month - The name of the month.
 * @returns {string[]} The list of species in the specified month.
 */
export const getSpeciesByDate = (month: string | null): string[] | null => {
  if (!month) {
    return null;
  }

  return speciesByDate[month] || [];
}

/**
 * Add a species to the list for a given month and save the updated data.
 *
 * @param {string} month - The name of the month.
 * @param {string} specie - The name of the species to add.
 */
export const addSpecieByDate = (month: string, specie: string) => {
  month = month.toLowerCase();

  if (!speciesByDate[month]) {
    speciesByDate[month] = [];
  }

  speciesByDate[month].push(specie);
  speciesByDate[month].sort();

  dateDataSave();
}

/**
 * Remove a species from the list for a given month and save the updated data.
 *
 * @param {string} month - The name of the month.
 * @param {string} specie - The name of the species to remove.
 */
export const removeSpecieByDate = (month: string, specie: string) => {
  month = month.toLowerCase();

  if (!speciesByDate[month]) {
    return;
  }

  speciesByDate[month] = speciesByDate[month].filter(s => s !== specie);
  speciesByDate[month].sort();

  dateDataSave();
}

/**
 * Add a species to the list for a given region and save the updated data.
 *
 * @param {string} region - The name of the region.
 * @param {string} specie - The name of the species to add.
 */
export const addSpecieByRegion = (region: string, specie: string) => {
  if (!speciesByRegion[region]) {
    speciesByRegion[region] = [];
  }

  speciesByRegion[region].push(specie);
  speciesByRegion[region].sort();

  regionDataSave();
}

/**
 * Remove a species from the list for a given region and save the updated data.
 *
 * @param {string} region - The name of the region.
 * @param {string} specie - The name of the species to remove.
 */
export const removeSpecieByRegion = (region: string, specie: string) => {
  if (!speciesByRegion[region]) {
    return;
  }

  speciesByRegion[region] = speciesByRegion[region].filter(s => s !== specie);
  speciesByRegion[region].sort();

  regionDataSave();
}

/**
 * Save the speciesByDate object to its JSON file.
 */
export const dateDataSave = () => {
  const dateDataPath = path.join('./data', 'species_by_date.json');
  fs.writeFileSync(dateDataPath, JSON.stringify(speciesByDate, null, 2));
}

/**
 * Save the speciesByRegion object to its JSON file.
 */
export const regionDataSave = () => {
  const regionDataPath = path.join('./data', 'species_by_region.json');
  fs.writeFileSync(regionDataPath, JSON.stringify(speciesByRegion, null, 2));
}
