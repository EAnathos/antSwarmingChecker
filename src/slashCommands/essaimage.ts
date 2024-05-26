import {
  SlashCommandBuilder,
  CommandInteractionOptionResolver,
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
            "Indiquer la région en question (en nombre, exemple: 01 pour Ain)"
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
            "Indiquer le mois en question (en lettre, exemple: janvier)"
          )
          .setRequired(false)
    ),
  execute: async (interaction) => {
    const options = interaction.options as CommandInteractionOptionResolver;

    // Get month and region from the options
    let month = options.getString("mois")?.toLocaleLowerCase();
    const location = options.getString("region");

    let message: string;

    if (month) {
      if (!frenchMonths.includes(month)) {
        await interaction.reply("Veuillez indiquer un mois valide.");
        return;
      }
    }

    if (location) {
      if (location.length !== 2) {
        await interaction.reply(
          "Veuillez indiquer un numéro de région valide."
        );
        return;
      }
    }

    if (!location && !month) {
      await interaction.reply("Veuillez indiquer une région ou un mois.");
      return;
    }

    if (!location && month) {
      const dateSpecies = getSpeciesByDate(month);
      if (!dateSpecies) {
        await interaction.reply(
          `Aucun essaimage n'est prévu pour le mois de \`${month}\`.`
        );
        return;
      }

      await interaction.reply(
        `**Les essaimages prévus pour le mois de \`${month}\` sont:**\n*  ${dateSpecies!.join(
          "\n* "
        )}.`
      );
      return;
    } else if (!month && location) {
      const regionSpecies = getSpeciesByRegion(location);
      if (!regionSpecies) {
        await interaction.reply(
          `Aucun essaimage n'est prévu pour la région \`${location}\`.`
        );
        return;
      }

      await interaction.reply(
        `**Les essaimages prévus pour la région \`${location}\` sont:**\n*  ${regionSpecies!.join(
          "\n* "
        )}.`
      );
      return;
    } else {
      const regionSpecies = getSpeciesByRegion(location);
      const dateSpecies = getSpeciesByDate(month!);

      if (!regionSpecies || !dateSpecies) {
        await interaction.reply(
          `Aucun essaimage n'est prévu pour la région \`${location}\` et le mois de \`${month}\`.`
        );
        return;
      }

      const species = regionSpecies.filter((value) =>
        dateSpecies.includes(value)
      );

      if (species.length === 0) {
        await interaction.reply(
          `Aucun essaimage n'est prévu pour la région \`${location}\` et le mois de \`${month}\`.`
        );
        return;
      } else {
        await interaction.reply(
          `**Les essaimages prévus pour la région \`${location}\` et le mois de \`${month}\` sont:**\n*  ${species.join(
            "\n* "
          )}.`
        );
        return;
      }
    }
  },
};
