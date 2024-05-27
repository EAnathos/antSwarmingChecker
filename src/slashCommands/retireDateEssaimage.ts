import { SlashCommandBuilder, CommandInteractionOptionResolver } from 'discord.js';
import { SlashCommand } from '../types';
import { removeSpecieByDate } from '../dataLoader';

// Whitelist of users allowed to use this command (by Discord ID).
const whitelistUsers = ["306816615650033664"]

export const command: SlashCommand = {
  name: 'retiredateessaimage',
  data: new SlashCommandBuilder()
    .setName("retiredateessaimage")
    .setDescription("Retire une date d'essaimage pour une espèce donnée")
    .addStringOption(option => // Adding option for ant specie
      option.setName("fourmis")
        .setDescription("Veuillez bien noter sous le format `Genre espèce`")
        .setRequired(true)
    )
    .addStringOption(option => // Adding option for month
      option.setName("mois")
        .setDescription("Indiquer le mois en question (en lettre, exemple : janvier)")
        .setRequired(true)
    ),
  execute: async (interaction) => {
    // Check if the user is allowed to use this command
    if (!whitelistUsers.includes(interaction.user.id)) {
      await interaction.reply({
        content: "Vous n'avez pas la permission d'utiliser cette commande.",
        ephemeral: true
      });
      return;
    }

    const options = interaction.options as CommandInteractionOptionResolver;

    // Get the ant specie and month from the options
    const ant = options.getString("fourmis")!;
    let month = options.getString("mois")!;

    // Remove the ant specie from the list for the specified month
    removeSpecieByDate(month, ant);

    // Reply to the interaction with a confirmation message
    await interaction.reply({
        content: `L'espèce \`${ant}\` a bien été ajoutée pour le mois de \`${month}\``,
        ephemeral: true
    });    
  }
};
