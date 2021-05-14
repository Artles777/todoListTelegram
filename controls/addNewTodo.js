import { Markup, Scenes } from 'telegraf'
import { todo } from '../index.js'
import { todoList } from '../store/state.js'

export const addNewTodo = new Scenes.BaseScene('ADD_NEW_TODO')
export const addNewTodoStages = new Scenes.Stage([addNewTodo])

addNewTodo.enter((ctx) => {
    ctx.session.todoData = {}
	ctx.reply('Вы хотите добавить новую задачу в список?', Markup.inlineKeyboard([
        Markup.button.callback('Да', 'ADD_TODO'),
        Markup.button.callback('Нет', 'REMOVE_TODO')
    ]))
})

addNewTodo.action('ADD_TODO', (ctx) => {
    ctx.reply('Задача добавлена!')
    todoList.push(todo)
    ctx.session.todoData = 'Да'

    return ctx.scene.leave();
})

addNewTodo.action('REMOVE_TODO', (ctx) => {
    ctx.reply('Задача не была добавлена!')
    ctx.session.todoData = 'Нет'
    
    return ctx.scene.leave();
})

addNewTodo.leave((ctx) => {
    if (todoList.length) {
        ctx.reply(`Ваш список задач: \n${todoList.join(', ')}`)
    } else {
        ctx.reply('Ваш список задач пуст.')
    }
})