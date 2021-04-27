import { Telegraf } from 'telegraf'

const TOKEN = '1623595362:AAFW5pEbhlxX59AsiUBiPHybIh4MsBIYZaE'
const todoList = []

const bot = new Telegraf(TOKEN)

bot.start((ctx) => {
	const {first_name} = ctx.message.from
	ctx.reply(`${first_name}, добро пожаловать в todo list!`)
})

bot.command('newtodo', (ctx) => {
	const {first_name} = ctx.message.from
	ctx.reply(`${first_name}, введите новую задачу`)

	bot.on('text', (ctx) => {
		const {text} = ctx.message
		ctx.reply(`У вас новая задача: ${text}`)

		todoList.push(text)
		ctx.reply('Список ваших задач:\n' + todoList)
	})
})

bot.launch().then(() => console.log('Bot success!'))
