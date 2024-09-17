import * as fs from 'fs'
import { input } from '@inquirer/prompts'
import { interface_creator } from './interface.mjs'

var Key = "https://api.torn.com/key/?selections=info&key=" // first part and the final key after concat
const SecondKeyPart = "&comment=MedBay-testingKey"
const minimal_KeyLevel = 1
var key_recived = null
var key_valid = true

// font code from manage
export async function manageKey() {
	await interface_creator()
	do {
		if(key_valid == false) {console.log('\x1b[31m', '> Invalid Key'); reset_color()}
		const answer = await input({message: 'input your API [Public Acess]'})
		console.log('> TestingKey')
		await callKey(await buildKey(answer)) // call builder/tester key
	} while(key_valid !== true)
	console.log('> Valid Key')
	console.log('> Saving Key')
}

function buildKey(serial) { 
	key_recived = serial// set key
	return Key = Key.concat(key_recived, SecondKeyPart)}

async function callKey(key) {
	await fetch(key).then(response => {
		console.log(key)
		if(!response.ok) {key_valid = false; return}
		return response.json()
	}).then(data => {
		// test if key have push data and if is the correct level or above
		if(data.access_type !== undefined && data.access_level >= minimal_KeyLevel) {
			console.log('> Key Type: ', data.access_type);
			key_valid = true // if key is valid
		}
		// if key is invalid
		else {key_valid = false}
		Key= "https://api.torn.com/key/?selections=info&key="
		key_recived = null; // reset key
	})
}

//glitched
function save_key() {
	const data = JSON.parse(fs.readFileSync('./utility/storage/storage.json'))
	data.Key = key_recived
	fs.writeFileSync('./utility/storage/storage.json', JSON.stringify(data, null, 2)); 
}
function reset_color() {return console.log('\x1b[0m')}