import open, { openApp, apps } from 'open'
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
var user_Data = null
var faction_Data = null

var faction_length = null
var faction_members = null
var faction_targets = []

const Faction_ID = await number({message: 'input the faction ID'})
concatenatedF = concatenatedF.concat(apiF, Faction_ID, apiK, process.env.api_key)
concatenatedU = concatenatedU.concat(apiU, apiK, process.env.api_key)

console.log("> builded call")
console.log("> calling")

await fetch(concatenatedU).then(response => {
	if(!response.ok) {throw new Error('problem')}
	return response.json()
}).then(data => {user_Data = data; return console.log("user_Data loaded")}).catch(error => {return console.error("Error: ", error)})
await fetch(concatenatedF).then(response => {
	if(!response.ok) {throw new Error('problem')}
	return response.json()
}).then(data => {
	faction_Data = data;
	faction_length = Object.keys(data.members).length;
	faction_members = Object.keys(data.members)
	return console.log("faction_Data loaded")}).catch(error => {return console.error("Error: ", error)
})

console.log('\n')
console.log(`welcome ${user_Data.name}, this is your MedBay, in configurations, the browser auto-start is [${permission}]`)
console.log(`your faction target is ${faction_Data.name}, and have ${faction_length} members`)
console.log('\n')
console.log('loading revivable activated members [disconsidering hospitalized]')
await push_members(faction_members)
console.log('loaded all members, ', faction_targets.length, 'target\'s found')

async function push_members(members) {
	var firstPart = 'https://api.torn.com/user/'
	var secondPart = '?selections=profile&key=' + process.env.api_key
	for(var i = 0; i<members.length; i++) {
		var target_call = firstPart + members[i] + secondPart
			await fetch(target_call).then(response => {
			if(!response.ok) {throw new Error('problem')}
			return response.json()
		}).then(data => {
			if(data.revivable == 1) {faction_targets.push(JSON.stringify(data.player_id))}
		}).catch(error => {return console.error("Error: ", error)})
	}
	console.log('all members fetched, displaying target lists')
	return console.log(faction_targets)
	if(permission == true) {
		console.log('opening all members with revivable')
		for(var i = 0; i<faction_targets.length; i++) {
			await open('https://www.torn.com/profiles.php?XID='+faction_targets[i])
		}
	}
}