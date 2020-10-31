const { getTribe } = require('../util')
const { saveKill, getCount } = require('../db')

module.exports = {
  name: 'addkill',
  description: 'add a kill for a specific tribe associated with the channel',
  aliases: ['add', 'kill', 'k', ''],
  usage(prefix) {
    return `${prefix}kill b`
  },
  // You can have as many categories as you want, just make sure to update the help.js file with them
  category: 'Basic',
  execute: async function(message, argsStr, embed) {
    if(!argsStr)
      throw 'You need to include the tribe...'

    const args = argsStr.split(/ +/).filter(x => x != '')
    const tribeArg = args[0].toLowerCase()

    try {
      const tribe = getTribe(tribeArg)
      await saveKill(message.guild.id, message.channel.id, tribe.code)
      const count = await getCount(message.channel.id, tribe.code)

      const newMessage = await message.channel.send(`Added a kill for ${tribe.name} successfully.\nTotal of **${count}** so far.`)
      newMessage.delete({ timeout: 10000 })

      if(count > 9)
        await message.channel.send(`${message.author}, tell your team that ${tribe.name} can place their Gate of Power!`)
    } catch(err) { throw err }
  }
}