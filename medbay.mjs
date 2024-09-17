import { select } from '@inquirer/prompts'
import { readFileSync } from 'fs'
// own libraries
import { interface_creator } from './utility/interface.mjs'
import { config } from './utility/configuration.mjs'

var configurations = true // default because the catch 
var loop = true // loop the interface generator

interface_creator()


do{
	if(loop !== null) {interface_creator()} // interface generator
	// test if user added he key
	try {readFileSync('./utility/storage/storage.json', 'utf8')} catch {
		configurations = false
		console.log('\x1b[31m','> API not found')
		reset_color()
	}
	loop = await menu_answers(await menu_selection()) // call user input and send to menu answers function	
}while(loop == true)

// turn off
interface_creator()
console.log('Have a good day/night')

// await for the user input
function menu_selection() {
	return select({message: 'MedBay Menu : if is your FIRST time go to Configuration FIRST', choices: [
		{name: 'Start',value: 0},
		{name: 'configuration',value: 1},
		{name: 'credits',value: 2},
		{name: 'exit',value: 3}
	]})
}

// recive the value from user input
async function menu_answers(answer) {
	var loop = true // loop defalse is true
	switch(answer) {
		case 0:
			if(configurations == true){} // protect to dont call without a key
		break;
		case 1:
			await config()
		break;
		case 2:
			console.log('\n');
			console.log('2')
		break;
		case 3:
			loop = false // changing the menu loop (turn off program)
		break;
		default:
			console.error('\x1b[31m','Error - Menu_selection, invalid input'); reset_color()
	}
	return loop
}

function reset_color() {return console.log('\x1b[0m')} // reset de prompt color