import { session, Telegraf } from 'telegraf'
import { addNewTodoStages } from './controls/addNewTodo.js'
import localSession from "./store/state.js";

const TOKEN = '1623595362:AAFW5pEbhlxX59AsiUBiPHybIh4MsBIYZaE'

const bot = new Telegraf(TOKEN)

bot.use(localSession.middleware('session'))

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

		// todoList.push(text)
		ctx.reply('Список ваших задач:\n')
	})
})

bot.command('rm', (ctx) => {
	const id = `${ctx.message.from.id}:${ctx.message.chat.id}`
	if (ctx.sessionDB.get('todoList').find({ id }).value().id === id) {
		// ctx.sessionDB.set(`todoList.todos`, []).write()
		ctx.sessionDB.get('todoList').find({ id }).value().todos = []
	}
	ctx.reply('Список задач очищен!')
})

bot.on('text', (ctx) => {
	ctx.session = {
		newTodo: ctx.message.text,
		id: `${ctx.message.from.id}:${ctx.message.chat.id}`
	}
	ctx.scene.enter('ADD_NEW_TODO')
		.then(() => console.log('Начало сцены добавления новой задачи'))
})

bot.launch().then(() => console.log('Bot success!'))
