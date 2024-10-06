import * as fs from 'fs'
import { CallStorage } from './storage.mjs'
import { testDevMode } from '../sys/devMode/devmode.mjs'
export function interface_creator() {
	process.title = 'MedBay' // change the title from cmd
	console.log('\x1Bc') // clean console
	console.log('\x1b[33m') // change color
	console.log(fs.readFileSync('./graphics/start.txt', 'utf8')) // load title
	if(testDevMode() !== false) {
		console.log('\x1b[31m')
		console.log('> Development Mode : ignoring JSON key')
		console.log('\x1b[33m')
	}
	console.log('> Made by Eloazy [3028393]')

	// reset color
	reset_color()
	console.log(fs.readFileSync('./graphics/separator.txt', 'utf8')) // create the = separator
	console.log('\n')
}

function reset_color() {return console.log('\x1b[0m')} // reset the console color