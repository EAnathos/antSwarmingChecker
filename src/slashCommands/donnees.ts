import {
  SlashCommandBuilder,
  CommandInteractionOptionResolver,
} from "discord.js";
import { SlashCommand } from "../types";

export const command: SlashCommand = {
  name: "donnees",
  data: new SlashCommandBuilder()
    .setName("donnees")
    .setDescription("Envoie le fichier de données utilisés par MP")
    .addStringOption(
      (
        option // Adding option for ant specie
      ) =>
        option
          .setName("fichier")
          .setDescription(
            "Veuillez choisir le fichier de données que vous souhaitez voir`"
          )
          .addChoices(
            { name: "Regions", value: "region" },
            { name: "Dates", value: "date" }
          )
          .setRequired(true)
    ),
  execute: async (interaction) => {
    // deferReply because we don't reply directly to the interaction
    await interaction.deferReply({ ephemeral: true });

    const options = interaction.options as CommandInteractionOptionResolver;

    // Get the ant specie and month from the options
    const fichier = options.getString("fichier")!;

    try {
      await interaction.user.send({
        content: `Voici les données disponibles actuellement.`,
        files: [
          {
            attachment: `./data/species_by_${fichier}.json`,
            name: `species_by_${fichier}.json`,
            description:
              "Les données que vous avez demandés, sous le format JSON",
          },
        ],
      });

      await interaction.editReply("Les données ont été envoyées en MP !");
    } catch (error) {
      await interaction.editReply({
        content: `**Impossible de vous envoyez les données par MP.**.`,
      });
    }
  },
};
