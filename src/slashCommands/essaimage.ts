import {
  SlashCommandBuilder,
  CommandInteractionOptionResolver,
  CommandInteraction,
} from "discord.js";
import { SlashCommand } from "../types";
import { predictSwarming } from "@/utils/swarmPrediction";

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

    if (area && area?.length == 1) area = "0" + area;
    if (area && area?.length != 2) {
      await interaction.reply({
        content: "Veuillez indiquer un département valide.",
        ephemeral: true,
      });
      return;
    }

    if (!area && !month) {
      await interaction.reply({
        content: "Veuillez indiquer un département ou un mois.",
        ephemeral: true,
      });
      return;
    }

    await interaction.reply(predictSwarming(month, area!));
  },
};
