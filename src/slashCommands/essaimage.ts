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
    .addIntegerOption(option =>
      option.setName("region")
        .setDescription("Indiquer la région en question (en nombre, exemple: 75 pour Paris)")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("mois")
        .setDescription("Indiquer le mois en question (en lettre, exemple: janvier)")
        .setRequired(false)
    ),
  execute: async (interaction) => {
    const options = interaction.options as CommandInteractionOptionResolver;

    let month = options.getString("mois");
    const location = options.getInteger("region")!;

    if (!month) {
      const currentMonthIndex = new Date().getMonth();
      month = frenchMonths[currentMonthIndex];
    }

    const regionSpecies = getSpeciesByRegion(location);
    const dateSpecies = getSpeciesByDate(month);

    const speciesList = (regionSpecies.filter(species => dateSpecies.includes(species))).map(species => `* ${species}`).join('\n');

    const message: string = `**Voici les essaimages pour le mois de \`${month}\` et le département numéro \`${location}\` :**\n` +
                            (speciesList ? speciesList : "Aucune espèce trouvée.");

    await interaction.reply(message);
  }
};
