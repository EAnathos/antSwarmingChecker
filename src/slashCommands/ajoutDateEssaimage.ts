import { SlashCommandBuilder, CommandInteractionOptionResolver } from 'discord.js';
import { SlashCommand } from '../types';
import { getSpeciesByRegion, getSpeciesByDate, addSpecieByDate } from '../dataLoader';

const frenchMonths = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre"
];

export const command: SlashCommand = {
  name: 'ajouteDateEssaimage',
  data: new SlashCommandBuilder()
    .setName("ajouteDateEssaimage")
    .setDescription("Ajoute une date d'essaimage pour une espèce donnée")
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
    const options = interaction.options as CommandInteractionOptionResolver;

    const ant = options.getString("fourmis")!;
    let month = options.getString("mois")!;

    addSpecieByDate(month, ant);

    await interaction.reply({
        content: `L'espèce \`${ant}\` a bien été ajoutée pour le mois de \`${month}\``,
        ephemeral: true
    });    
  }
};
