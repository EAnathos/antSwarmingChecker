import { getSpeciesByArea, getSpeciesByDate } from "../dataLoader";

export function predictSwarming(month: string = "", area: string = ""): string {
    if (month && area) return predictSwarmingByMonthAndArea(month, area)
    else if (month) return predictSwarmingByMonth(month)
    else return predictSwarmingByArea(area)
}

function predictSwarmingByMonthAndArea(month: string, area: string) {
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
  
  function predictSwarmingByMonth(month: string) {
    const dateSpecies = getSpeciesByDate(month);
    if (!dateSpecies)
      return `Aucun essaimage n'est prévu pour le mois de \`${month}\`.`;
  
    return `**Les essaimages prévus pour le mois de \`${month}\` sont :**\n*  *${dateSpecies!.join(
      "*\n* *"
    )}*`;
  }
  
  function predictSwarmingByArea(area: string) {
    const areaSpecies = getSpeciesByArea(area);
    if (!areaSpecies)
      return `Aucune espèce n'essaime dans le département \`${area}\`.`;
  
    return `**Les essaimages possibles pour le département \`${area}\` sont :**\n*  *${areaSpecies!.join(
      "*\n* *"
    )}*`;
  }