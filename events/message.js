//Esta función se activara por cada mensaje enviado en un canal por el usuario:
module.exports = (client, message) => { 

  let RegMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
if (message.content.match(RegMention)) { 
message.reply("my prefix is `,`"); }
  
  if(!message.content.startsWith(client.config.prefix)) return; 
  if(message.author.bot) return;


  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);  
  const command = args.shift().toLowerCase()

  // Manejando los eventos.
  const cmd = client.commands.get(command); 
  if(!cmd) return; 

  cmd.execute(client, message, args);
  

}
