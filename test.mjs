import { number } from '@inquirer/prompts'
import { password } from '@inquirer/prompts'
import { input } from '@inquirer/prompts'
import { select } from '@inquirer/prompts'
import 'dotenv/config'
const permission = process.env.browser
const apiF = '://api.torn.com/faction/'
const apiU = '://api.torn.com/user/'
const apiK = '?selections=basic&key='
var concatenatedF = 'https'
var concatenatedU = 'https'
var confirm = false;

do {
	const Faction_ID = await number({message: 'input the faction ID'})

	concatenatedF = concatenatedF.concat(apiF, Faction_ID, apiK, process.env.api_key)
	concatenatedU = concatenatedU.concat(apiU, apiK, process.env.api_key)
	confirm = await select({
		message: 'confirm?',
		choices: [
			{name: 'yes', value: 0},
			{name: 'no', value: 1}
		]
	})
}while(confirm == true)

console.log(" ")
console.log(`welcome, [user], this is your Revive assistant, in configurations, the browser auto-start is ${permission}`)
console.log(`your revive xp is [value] our recomendation is [recomendation], have a good day/night`)
console.log(" ")
console.log("debug")
console.log(concatenatedU)
console.log(concatenatedF)

/*
fetch(apif).then(response => {
	if (!response.ok) {
		throw new Error('problem')
	}
	return response.json()
}).then(data => {
	//console.log("lenght: ", Object.keys(data.members).length)
	console.log("member's ID: ", Object.keys(data.members))
}).catch(error => {return console.error("Error", error)})
*/
/*fetch(api).then(response => {
	if (!response.ok) {
		throw new Error('problem')
	}
	return response.json()
}).then(data => {
	console.log('revivable: ', data.revivable)
}).catch(error => {
	console.error('Error: ', error)
})*/
