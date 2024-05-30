import {
  SlashCommandBuilder,
  CommandInteractionOptionResolver,
} from "discord.js";
import { SlashCommand } from "../types";
import { predictSwarming } from "../utils/swarmPrediction";

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

function normalizeString(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function correctMonth(input: string): string | null {
  const normalizedInput = normalizeString(input);
  for (const month of frenchMonths) {
    if (normalizeString(month) === normalizedInput) {
      return month;
    }
  }
  return null;
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
    )
    .addBooleanOption((option) =>
      option
        .setName("ephemère")
        .setDescription(
          "Si vous voulez que la réponse soit visible que par vous"
        )
        .setRequired(false)
    ),
  execute: async (interaction) => {
    const options = interaction.options as CommandInteractionOptionResolver;

    // Get month and area from the options
    let month = options.getString("mois");
    let area = options.getString("departement");
    let ephemeral = options.getBoolean("ephemère");

    if (month) {
      month = correctMonth(month);
      if (!month) {
        await interaction.reply({
          content: "Veuillez indiquer un mois valide.",
          ephemeral: true,
        });
        return;
      }
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

    if (ephemeral !== true) ephemeral = false;

    await interaction.reply({
      content: predictSwarming(month!, area!),
      ephemeral: ephemeral,
    });
  },
};
