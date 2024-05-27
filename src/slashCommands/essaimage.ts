import {
  SlashCommandBuilder,
  CommandInteractionOptionResolver,
  CommandInteraction,
} from "discord.js";
import { SlashCommand } from "../types";
import { getSpeciesByRegion, getSpeciesByDate } from "../dataLoader";

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

async function predictSwarmingByMonthAndLocation(month :string, location :string, interaction :CommandInteraction) {
  const regionSpecies = getSpeciesByRegion(location);
  const dateSpecies = getSpeciesByDate(month!);

  if (!regionSpecies || !dateSpecies) 
    return await interaction.reply(
      `Aucun essaimage n'est prévu pour le département \`${location}\` au mois de \`${month}\`.`
    );

  const species = regionSpecies.filter((value) =>
    dateSpecies.includes(value)
  );

  if (species.length === 0)
    return await interaction.reply(
      `Aucun essaimage n'est prévu pour le département \`${location}\` au mois de \`${month}\`.`
    );

  await interaction.reply(
    `**Les essaimages prévus pour le département \`${location}\` au mois de \`${month}\` sont :**\n* *${species.join(
      "*\n* *"
    )}*`
  );
}

async function predictSwarmingByMonth(month :string, interaction :CommandInteraction) {
  const dateSpecies = getSpeciesByDate(month);
  if (!dateSpecies)
    return await interaction.reply(
      `Aucun essaimage n'est prévu pour le mois de \`${month}\`.`
    );

  await interaction.reply(
    `**Les essaimages prévus pour le mois de \`${month}\` sont :**\n*  *${dateSpecies!.join(
      "*\n* *"
    )}*`
  );
}

async function predictSwarmingByLocation(location :string, interaction :CommandInteraction) {
  const regionSpecies = getSpeciesByRegion(location);
  if (!regionSpecies)
    return await interaction.reply(
      `Aucune espèce n'essaime dans le département \`${location}\`.`
    );

  await interaction.reply(
    `**Les essaimages possibles pour le département \`${location}\` sont :**\n*  *${regionSpecies!.join(
      "*\n* *"
    )}*`
  );
}

export const command: SlashCommand = {
  name: "essaimage",
  data: new SlashCommandBuilder()
    .setName("essaimage")
    .setDescription("Liste les essaimages d'une région selon une date")
    .addStringOption(
      (
        option // Adding option for region
      ) =>
        option
          .setName("region")
          .setDescription(
            "Indiquer la région en question (en nombre, exemple : 01 pour Ain)"
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
            "Indiquer le mois en question (en lettre, exemple : janvier)"
          )
          .setRequired(false)
    ),
  execute: async (interaction) => {
    const options = interaction.options as CommandInteractionOptionResolver;

    // Get month and region from the options
    let month = options.getString("mois")?.toLocaleLowerCase();
    const location = options.getString("region");

    if (month && !frenchMonths.includes(month))
      return await interaction.reply("Veuillez indiquer un mois valide.");

    if (location?.length !== 2)
      return await interaction.reply(
        "Veuillez indiquer un numéro de département valide."
      );

    if (!location && !month)
      return await interaction.reply("Veuillez indiquer un département ou un mois.");

    if (location && month)
      predictSwarmingByMonthAndLocation(month, location, interaction);
    
    if (month)
      return predictSwarmingByMonth(month, interaction);
    
    if (location)
      return predictSwarmingByLocation(location, interaction);
  },
};
