import {
  SlashCommandBuilder,
  CommandInteractionOptionResolver,
  CommandInteraction,
} from "discord.js";
import { SlashCommand } from "../types";
import { getSpeciesByArea, getSpeciesByDate } from "../dataLoader";

const frenchMonths = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

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

export function predictSwarmingByMonth(month: string) {
  const dateSpecies = getSpeciesByDate(month);
  if (!dateSpecies)
    return `Aucun essaimage n'est prévu pour le mois de \`${month}\`.`;

  return `**Les essaimages prévus pour le mois de \`${month}\` sont :**\n*  *${dateSpecies!.join(
    "*\n* *"
  )}*`;
}

export function predictSwarmingByArea(area: string) {
  const areaSpecies = getSpeciesByArea(area);
  if (!areaSpecies)
    return `Aucune espèce n'essaime dans le département \`${area}\`.`;

  return `**Les essaimages possibles pour le département \`${area}\` sont :**\n*  *${areaSpecies!.join(
    "*\n* *"
  )}*`;
}

export const command: SlashCommand = {
  name: "essaimage",
  data: new SlashCommandBuilder()
    .setName("essaimage")
    .setDescription("Liste les essaimages d'un département selon une date")
    .addStringOption(
      (
        option // Adding option for area
      ) =>
        option
          .setName("departement")
          .setDescription(
            "Indiquer le département en question (en nombre, exemple : 34 pour Herault)"
          )
          .setRequired(false)
    )
    .addStringOption(
      (
        option // Adding option for month
      ) =>
        option
          .setName("mois")
          .setDescription(
            "Indiquer le mois en question (en lettre, exemple : août)"
          )
          .setRequired(false)
    ),
  execute: async (interaction) => {
    const options = interaction.options as CommandInteractionOptionResolver;

    // Get month and area from the options
    let month = options.getString("mois")?.toLocaleLowerCase();
    let area = options.getString("departement");

    if (month && !frenchMonths.includes(month)) {
      await interaction.reply({
        content: "Veuillez indiquer un mois valide.",
        ephemeral: true,
      });
      return;
    }

    if (area && area?.length !== 2) area = "0" + area;

    if (!area && !month) {
      await interaction.reply({
        content: "Veuillez indiquer un département ou un mois.",
        ephemeral: true,
      });
      return;
    }

    if (area && month)
      await interaction.reply(predictSwarmingByMonthAndArea(month, area));
    else if (month) await interaction.reply(predictSwarmingByMonth(month));
    else await interaction.reply(predictSwarmingByArea(area!));
  },
};
