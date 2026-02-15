const Discord = require('discord.js')
const { ActivityType } = require('discord.js');
const config = require("./config.json")
const client = new Discord.Client({
  intents: [Discord.GatewayIntentBits.Guilds]
});


module.exports = client

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){
      const cmd = client.slashCommands.get(interaction.commandName);
      if (!cmd) return interaction.reply(`Error`);
      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);
      cmd.run(client, interaction)

   }
})

client.on('ready', () => {
    console.log(`🔥 Estou online em ${client.user.username}!`);
    client.user.setPresence({
      activities: [{ name: `👋🏻 | Made By: kn#9639`, url: `https://www.twitch.tv/whitespaa`, type: ActivityType.Streaming }],
      status: 'STREAMING',
    });
})  
  
client.slashCommands = new Discord.Collection()
require('./handler')(client)
client.login(process.env.TOKEN)



