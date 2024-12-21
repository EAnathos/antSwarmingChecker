import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../types";

export const command: SlashCommand = {
  name: "antarea",
  data: new SlashCommandBuilder()
    .setName("antarea")
    .setDescription("Affiche des informations sur l'association Antarea"),
  execute: async (interaction) => {
    const antareaPresentationEmbed = new EmbedBuilder()
      .setTitle("Antarea")
      .setURL("https://antarea.fr")
      .setDescription(
        `Cette association a pour but de réaliser des études et des identifications pour mieux connaitre les espèces, la répartition et la localisation des fourmis françaises métropolitaines
        
        Je ne peux que vous conseiller de vous renseigner sur cette association qui a une réelle importance pour nous myrmécophiles en herbe !`
      )
      .setThumbnail(
        "https://antarea.fr/fourmi/public/themes/antarea/img/antarealogo.png"
      )
      .setColor("#3AB0E8");

    await interaction.reply({
      embeds: [antareaPresentationEmbed],
      ephemeral: true,
    });
  },
};
