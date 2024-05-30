import * as dotenv from 'dotenv';
import * as schedule from 'node-schedule';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { SlashCommand } from './types';
import { join } from 'path';
import { readdirSync } from 'fs';
import { loadData } from './utils/dataLoader';
import { backupFiles } from './utils/dataBackup';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ]
});

client.slashCommands = new Collection<string, SlashCommand>();

const handlersDir = join(__dirname, "./handlers");

readdirSync(handlersDir).forEach(handler => {
  require(`${handlersDir}/${handler}`)(client);
});

// Load the data files
loadData();

// Schedule a backup of the data files every Sunday at midnight
schedule.scheduleJob('0 0 * * 0', backupFiles);

client.login(process.env.TOKEN);
