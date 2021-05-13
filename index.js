const Discord = require("discord.js");
const client = new Discord.Client();
client.cooldowns = new Discord.Collection();
let { readdirSync } = require("fs");
client.config = require("./config.js");
client.commands = new Discord.Collection();
for (const file of readdirSync("./commands/")) {
  if (file.endsWith(".js")) {
    let fileName = file.substring(0, file.length - 3);
    let fileContents = require(`./commands/${file}`);
    client.commands.set(fileName, fileContents);
  }
}
for (const file of readdirSync("./events/")) {
  if (file.endsWith(".js")) {
    let fileName = file.substring(0, file.length - 3);
    let fileContents = require(`./events/${file}`);
    client.on(fileName, fileContents.bind(null, client));
  }
}

const keepAlive = require('./server');

//auto message every 2 hrs
client.on("ready",() => {
  const generalChannel = client.channels.cache.get('838173703291273216');
  setInterval(() => {
      const revivenode = new Discord.MessageEmbed()
         .setTitle("Vanilla Earth Is Sponsored By Revivenode")
         .setColor('RANDOM')
         .setDescription("Use code `EARTH` for 20% off on your purchase!\nVisit Revivenode here: \nhttps://revivenode.com")
         .setFooter('Vanilla Earth', 'https://imgur.com/k8p2M78.png')
      generalChannel.send(revivenode);
    }, 7200000);
  });

keepAlive();

client.login(process.env.BOT_TOKEN).then(() => {
    console.log(`I'm ready: ${client.user.tag}`);
  })
  .catch(err => {
    console.error("Error while starting session: " + err);
  });