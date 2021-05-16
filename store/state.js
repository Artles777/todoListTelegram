import { session, Telegraf } from 'telegraf'
import LocalSession from "telegraf-session-local";

const localSession = new LocalSession({
	database: 'state.json',
	state: { todoList: [] }
})

export default localSession;
