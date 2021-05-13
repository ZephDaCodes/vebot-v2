const Discord = require('discord.js');
const fetch = require('node-fetch');
const client = new Discord.Client();

module.exports = (client, member, message, MessageEmbed) => {
  
  client.user.setPresence(
    { activity: { name: ',help || Vanilla Earth', type: 'STREAMING', url: 'https://www.twitch.tv/vuixen' }, status: 'online' });

//suggestions
  client.on("message", async (message) => { 
    let guild = message.guild
    if (message.channel.id === '842043232568344622') {
    if (message.author.bot) return;
    let channel = client.channels.cache.get('842043232568344622');
    if (message.reference) return;
   const embed = new Discord.MessageEmbed()
    .setTitle(`New suggestion`)
    .setDescription(`${message.content}`)
    .setColor('RANDOM')
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
   .setTimestamp()
   message.delete()
  message.channel.send(embed).then(message => {
                message.react('👍')
                message.react('👎')})
    console.log('Received a suggestion!');
  }});

  //accept/deny suggestions
  client.on ('messageReactionAdd', async (reaction, user)=>{
    if(user.bot) return;
    let channel = reaction.message.channel
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (!reaction.message.guild.available) return;
    if (reaction.message.channel.id === "842043232568344622") {
      let reactor = reaction.message.guild.members.cache.get(user.id)
      if (reactor.permissions.has('MANAGE_MESSAGES')) {
        if (reaction.emoji.name === "👍") {
          const accepted = new Discord.MessageEmbed()
          .setTitle(`Suggestion accepted`)
          .setDescription(`${reaction.message.embeds[0].description}`)
          .setColor('GREEN')
          .setFooter(`Suggested by ${reaction.message.embeds[0].author.name}`, `${reaction.message.embeds[0].author.iconURL}`)
          .setTimestamp()
          console.log('Accepted a suggestion!')
          channel.send(accepted)
          return;
        }
        if (reaction.emoji.name === "👎") {
          const rejected = new Discord.MessageEmbed()
          .setTitle(`Suggestion rejected`) 
          .setDescription(`${reaction.message.embeds[0].description}`)
          .setColor('RED')
          .setFooter(`Suggested by ${reaction.message.embeds[0].author.name}`, `${reaction.message.embeds[0].author.iconURL}`)
          .setTimestamp()
          channel.send(rejected)
        console.log('Denied a suggestion!')
        return;
        }
        else {
          return;
        }}
    }});
  
  client.on('guildMemberAdd', member => {
    let welcomeMessage = new Discord.MessageEmbed()
     .setTitle('Welcome to Vanilla Earth!')
     .setColor('#3e93de')
     .setDescription(`Vanilla Earth is a 1:1000 Earth SMP, featuring Java-Bedrock crossplay, player-based economy, dungeons, custom terrains, and bosses. We hope that you'll have an unforgettable and fun experience!`)
     .addField('Server IP', 'Java: vanillaearth.fun\nBedrock: vanillaearth.fun (port 8103)')
     .addField(`Follow Us`, `TikTok:\nhttps://www.tiktok.com/@vanillaearth\nReddit:\n https://www.reddit.com/r/VanillaEarthNetwork/`)
     .addField(`Server Rules`, `Check out <#729294377301835777> for information!`)
     .setFooter('Vanilla Earth | Welcome')
    member.send(welcomeMessage)
    console.log('Welcomed a newbie');
  });
};
