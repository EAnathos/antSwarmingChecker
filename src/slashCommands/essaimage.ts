import { SlashCommandBuilder, CommandInteractionOptionResolver } from 'discord.js';
import { SlashCommand } from '../types';
import { getSpeciesByRegion, getSpeciesByDate } from '../dataLoader';

const frenchMonths = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre"
];

export const command: SlashCommand = {
  name: 'essaimage',
  data: new SlashCommandBuilder()
    .setName("essaimage")
    .setDescription("Liste les essaimages d'une région selon une date")
    .addStringOption(option => // Adding option for region
      option.setName("region")
        .setDescription("Indiquer la région en question (en nombre, exemple: 01 pour Ain)")
        .setRequired(true)
    )
    .addStringOption(option => // Adding option for month
      option.setName("mois")
        .setDescription("Indiquer le mois en question (en lettre, exemple: janvier)")
        .setRequired(false)
    ),
  execute: async (interaction) => {
    const options = interaction.options as CommandInteractionOptionResolver;

    // Get month and region from the options
    let month = options.getString("mois");
    const location = options.getString("region")!;

    // If no month is specified, take the current month
    if (!month) {
      const currentMonthIndex = new Date().getMonth();
      month = frenchMonths[currentMonthIndex];
    }

    // Get species for the specified region and month
    const regionSpecies = getSpeciesByRegion(location);
    const dateSpecies = getSpeciesByDate(month);

    // Filter species present in both the region and the specified date
    const speciesList = (regionSpecies.filter(species => dateSpecies.includes(species))).map(species => `* ${species}`).join('\n');

    // Construct replied message
    const message: string = `**Voici les essaimages pour le mois de \`${month}\` et le département numéro \`${location}\` :**\n` +
                            (speciesList ? speciesList : "Aucune espèce trouvée.");

    // Reply to the interaction with the message
    await interaction.reply(message);
  }
};
