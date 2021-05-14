import { session, Telegraf } from 'telegraf'
import { addNewTodoStages } from './controls/addNewTodo.js'
import { todoList } from './store/state.js'

const TOKEN = '1623595362:AAFW5pEbhlxX59AsiUBiPHybIh4MsBIYZaE'

export let todo = '';

const bot = new Telegraf(TOKEN)

bot.use(session());
bot.use(addNewTodoStages.middleware());

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

bot.on('text', (ctx) => {
	todo = ctx.message.text
	ctx.scene.enter('ADD_NEW_TODO')
})

bot.launch().then(() => console.log('Bot success!'))
