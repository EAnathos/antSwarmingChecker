import { getSpeciesByArea, getSpeciesByDate } from "../dataLoader";

/**
 * Predict the species that will swarm in a given month and area.
 *
 * @param {string} month - The name of the month.
 * @param {string} area - The name of the area.
 * @returns {string} The predicted species that will swarm.
 */
export function predictSwarming(month: string = "", area: string = ""): string {
  if (month && area) return predictSwarmingByMonthAndArea(month, area);
  else if (month) return predictSwarmingByMonth(month);
  else return predictSwarmingByArea(area);
}

/*
 * Predict the species that will swarm in a given month and area.
 *
 * @param {string} month - The name of the month.
 * @param {string} area - The name of the area.
 * @returns {string} The predicted species that will swarm.
 */
export function predictSwarmingByMonthAndArea(month: string, area: string) {
  const areaSpecies = getSpeciesByArea(area);
  const dateSpecies = getSpeciesByDate(month!);

  if (!areaSpecies || !dateSpecies)
    return `Aucun essaimage n'est prévu pour le département \`${area}\` au mois de \`${month}\`.`;

  const species = areaSpecies.filter((value) => dateSpecies.includes(value));

  if (species.length === 0)
    return `Aucun essaimage n'est prévu pour le département \`${area}\` au mois de \`${month}\`.`;

  return `**Les essaimages prévus pour le département \`${area}\` au mois de \`${month}\` sont :**\n* *${species.join(
    "*\n* *"
  )}*`;
}

/*
 * Predict the species that will swarm in a given month.
 *
 * @param {string} month - The name of the month.
 * @returns {string} The predicted species that will swarm.
 */
export function predictSwarmingByMonth(month: string) {
  const dateSpecies = getSpeciesByDate(month);
  if (!dateSpecies)
    return `Aucun essaimage n'est prévu pour le mois de \`${month}\`.`;

  return `**Les essaimages prévus pour le mois de \`${month}\` sont :**\n*  *${dateSpecies!.join(
    "*\n* *"
  )}*`;
}

/*
 * Predict the species that will swarm in a given area.
 *
 * @param {string} area - The name of the area.
 * @returns {string} The predicted species that will swarm.
 */
export function predictSwarmingByArea(area: string) {
  return `La liste est potentiellement longue, je vous renvoie directement au site d'Antarea avec le bon lien.
  \n https://antarea.fr/fourmi/?repartition/departements.html?departement=${area}`;
}
