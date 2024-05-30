import fs from 'fs';
import path from 'path';

let speciesByArea: Record<string, string[]> = {};
let speciesByDate: Record<string, string[]> = {};

/**
 * Load data from JSON files and initialize the speciesByArea and speciesByDate objects.
 * This function also sorts the species lists in each area and date after loading.
 */
export const loadData = () => {
  const areaDataPath = path.join('./data', 'species_by_area.json');
  const dateDataPath = path.join('./data', 'species_by_date.json');

  const areaData = fs.readFileSync(areaDataPath, 'utf-8');
  speciesByArea = JSON.parse(areaData);
  for (const area in speciesByArea) {
    speciesByArea[area].sort();
  }

  const dateData = fs.readFileSync(dateDataPath, 'utf-8');
  speciesByDate = JSON.parse(dateData);
  for (const month in speciesByDate) {
    speciesByDate[month].sort();
  }

  areaDataSave();
  dateDataSave();
};

/**
 * Get the list of species for a given area.
 *
 * @param {string} area - The name of the area.
 * @returns {string[]} The list of species in the specified area.
 */
export const getSpeciesByArea = (area: string | null): string[] | null => {
  if (!area) {
    return null;
  }

  return speciesByArea[area] || null;
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

  return speciesByDate[month] || null;
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
 * Add a species to the list for a given area and save the updated data.
 *
 * @param {string} area - The name of the area.
 * @param {string} specie - The name of the species to add.
 */
export const addSpecieByArea = (area: string, specie: string) => {
  if (!speciesByArea[area]) {
    speciesByArea[area] = [];
  }

  speciesByArea[area].push(specie);
  speciesByArea[area].sort();

  areaDataSave();
}

/**
 * Remove a species from the list for a given area and save the updated data.
 *
 * @param {string} area - The name of the area.
 * @param {string} specie - The name of the species to remove.
 */
export const removeSpecieByArea = (area: string, specie: string) => {
  if (!speciesByArea[area]) {
    return;
  }

  speciesByArea[area] = speciesByArea[area].filter(s => s !== specie);
  speciesByArea[area].sort();

  areaDataSave();
}

/**
 * Save the speciesByDate object to its JSON file.
 */
export const dateDataSave = () => {
  const dateDataPath = path.join('./data', 'species_by_date.json');
  fs.writeFileSync(dateDataPath, JSON.stringify(speciesByDate, null, 2));
}

/**
 * Save the speciesByArea object to its JSON file.
 */
export const areaDataSave = () => {
  const areaDataPath = path.join('./data', 'species_by_area.json');
  fs.writeFileSync(areaDataPath, JSON.stringify(speciesByArea, null, 2));
}
