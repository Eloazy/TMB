import * as fs from 'fs'
import { select } from '@inquirer/prompts'
import { interface_creator } from './interface.mjs'
import { manageKey } from './manage_key.mjs'
const Json_base_template = '{"Key":"","permissions":[0,0]}'
var safeguard = false // just to inquirer dont glitch

export async function config() {
	
	interface_creator()
	try {await fs.readFileSync('./utility/storage/storage.json', 'utf8')} 
	catch {
		console.log('\x1b[31m','> Storage not found')
		console.log('\x1b[31m','> creating a Storage')
		await fs.appendFile('./utility/storage/storage.json', JSON.stringify(Json_base_template), function(err) {
			if(err) {return console.log('\x1b[31m', '> Fatal Error : cant create storage')}
		})
		await reset_color()
	}
	await configuration_switcher(await options())
}

async function options() {
	return select({message: 'Configuration Mode', choices: [
		{
			name: 'Manage Key',
			value: 0
		},
		{
			name: 'Permissions configurations',
			value: 1
		},
		{
			name: 'return',
			value: -1
		}
	]})
}

async function configuration_switcher(answer) {
	if(answer == -1) {return 0}
	else if (answer == 0) {await manageKey()}
	else if (answer == 1) {console.log('\x1b[31m', 'in building'); reset_color()}
	else {console.error('\x1b[31m','Error - config_selection, invalid input'); reset_color()}
}

function reset_color() {return console.log('\x1b[0m')}