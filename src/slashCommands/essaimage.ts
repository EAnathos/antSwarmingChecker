import {
  SlashCommandBuilder,
  CommandInteractionOptionResolver,
  CommandInteraction,
} from "discord.js";
import { SlashCommand } from "../types";
import { getSpeciesByArea, getSpeciesByDate } from "../dataLoader";

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

async function predictSwarmingByMonthAndArea(
  month: string,
  area: string,
  interaction: CommandInteraction
) {
  const areaSpecies = getSpeciesByArea(area);
  const dateSpecies = getSpeciesByDate(month!);

  if (!areaSpecies || !dateSpecies)
    return await interaction.reply(
      `Aucun essaimage n'est prévu pour le département \`${area}\` au mois de \`${month}\`.`
    );

  const species = areaSpecies.filter((value) => dateSpecies.includes(value));

  if (species.length === 0)
    return await interaction.reply(
      `Aucun essaimage n'est prévu pour le département \`${area}\` au mois de \`${month}\`.`
    );

  await interaction.reply(
    `**Les essaimages prévus pour le département \`${area}\` au mois de \`${month}\` sont :**\n* *${species.join(
      "*\n* *"
    )}*`
  );
}

async function predictSwarmingByMonth(
  month: string,
  interaction: CommandInteraction
) {
  const dateSpecies = getSpeciesByDate(month);
  if (!dateSpecies)
    return await interaction.reply(
      `Aucun essaimage n'est prévu pour le mois de \`${month}\`.`
    );

  await interaction.reply(
    `**Les essaimages prévus pour le mois de \`${month}\` sont :**\n*  *${dateSpecies!.join(
      "*\n* *"
    )}*`
  );
}

async function predictSwarmingByArea(
  area: string,
  interaction: CommandInteraction
) {
  const areaSpecies = getSpeciesByArea(area);
  if (!areaSpecies)
    return await interaction.reply(
      `Aucune espèce n'essaime dans le département \`${area}\`.`
    );

  await interaction.reply(
    `**Les essaimages possibles pour le département \`${area}\` sont :**\n*  *${areaSpecies!.join(
      "*\n* *"
    )}*`
  );
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

    if (area && area?.length !== 2) area = "0" + area;

    if (!area && !month) {
      await interaction.reply({
        content: "Veuillez indiquer un département ou un mois.",
        ephemeral: true,
      });
      return;
    }

    if (area && month) predictSwarmingByMonthAndArea(month, area, interaction);
    else if (month) predictSwarmingByMonth(month, interaction);
    else predictSwarmingByArea(area!, interaction);
  },
};
