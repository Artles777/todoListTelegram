import { Markup, Scenes } from 'telegraf'
// import uuid from 'uuid'

export const addNewTodo = new Scenes.BaseScene('ADD_NEW_TODO')
export const addNewTodoStages = new Scenes.Stage([addNewTodo])

addNewTodo.enter((ctx) => {
	ctx.reply('Вы хотите добавить новую задачу в список?', Markup.inlineKeyboard([
		Markup.button.callback('Да', 'ADD_TODO'),
		Markup.button.callback('Нет', 'NO_TODO')
	]))
})

addNewTodo.action('ADD_TODO', (ctx) => {
	const { id } = ctx.session
	if (ctx.sessionDB.get('todoList').find({ id }).value() === undefined) {
		ctx.sessionDB.get('todoList').push({ id, todos: [] }).write()
	}
	if (ctx.sessionDB.get('todoList').find({ id }).value().id === id) {
		ctx.sessionDB.get('todoList').find({ id }).value().todos.push(ctx.session.newTodo)
	}
	ctx.reply('Задача добавлена!')

    return ctx.scene.leave();
})

addNewTodo.action('NO_TODO', (ctx) => {
    ctx.reply('Задача не была добавлена!')

    return ctx.scene.leave();
})

addNewTodo.leave((ctx) => {
	const list = {}
	const { id } = ctx.session
	if (ctx.sessionDB.get('todoList').find({ id }).value().todos.length) {
			ctx.sessionDB.get('todoList')
				.find({ id }).value().todos.forEach((todo, idx) => {
					list[idx + 1] = todo
				})
		const result = Object.entries(list).map(t => t.join(': '))
		ctx.reply(`Ваш список задач:\n\n${result.join(',\n')}`)
	} else {
			ctx.reply('Ваш список задач пуст.')
	}
})
