import { SlashCommandBuilder, CommandInteractionOptionResolver } from 'discord.js';
import { SlashCommand } from '../types';
import { removeSpecieByDate } from '../dataLoader';

const whitelistUsers = ["306816615650033664"]

export const command: SlashCommand = {
  name: 'ajouteDateEssaimage',
  data: new SlashCommandBuilder()
    .setName("ajouteDateEssaimage")
    .setDescription("Retire une date d'essaimage pour une espèce donnée")
    .addStringOption(option =>
      option.setName("fourmis")
        .setDescription("Veuillez bien noter sous le format `Genre espèce`")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("mois")
        .setDescription("Indiquer le mois en question (en lettre, exemple: janvier)")
        .setRequired(true)
    ),
  execute: async (interaction) => {
    if (!whitelistUsers.includes(interaction.user.id)) {
      await interaction.reply({
        content: "Vous n'avez pas la permission d'utiliser cette commande.",
        ephemeral: true
      });
      return;
    }

    const options = interaction.options as CommandInteractionOptionResolver;

    const ant = options.getString("fourmis")!;
    let month = options.getString("mois")!;

    removeSpecieByDate(month, ant);

    await interaction.reply({
        content: `L'espèce \`${ant}\` a bien été ajoutée pour le mois de \`${month}\``,
        ephemeral: true
    });    
  }
};
