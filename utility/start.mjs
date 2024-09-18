import { input } from '@inquirer/prompts'
import { CallStorage } from './storage.mjs'
import { interface_creator } from './interface.mjs'
import { keyBuild } from './key_builder.mjs'
import { ErrorType } from './error.mjs'

var localData = null
var serverData = null
var members = []
var Temporarymember = null
var revivableID = ['ID']
var revivableName = ['Name']
var a = 0;

export async function start() {
	await pullLocal()
	if(localData.permissions.awaysTest == true) {
		serverData = await keyBuild(localData.key, 'key', '/info', 'testKey')
		if(serverData.access_level >= 1) {
			console.log('> key tested')
			console.log('> starting')
		}
	}
	
	interface_creator()	
	const answer = await input({message: 'input the faction ID: '})
	serverData = await keyBuild(localData.key, 'faction', answer, 'getFactionUsers')
	members = await Object.keys(serverData.members)
	console.log('\x1b[33m')
	console.log('> loading')
	console.log(`> The faction: ${serverData.name} have: ${Object.keys(serverData.members).length} members`)
	reset_color()
	for(var i = 0; i<members.length; i++) {
		Temporarymember = await keyBuild('LUW4axvQphYgrXbR', 'user', members[i], 'profile')
		if(Temporarymember.revivable == 1) {
			revivableID[a] = Temporarymember.player_id
			revivableName[a] = Temporarymember.name
			a++
		}
	}
	console.log('\x1b[0m')
	console.log(`> ${revivableID.length} revivable players (ignorig hospital state)`)
	reset_color()
	console.log(`> printing all`)
	console.log('\x1b[33m')
	for(i = 0; i<revivableName.length; i++) {console.log(`> ${revivableName[i]}`)}
	reset_color()
	const pause = await input({message: 'program paused'})
}

async function pullLocal() {
	if(await CallStorage(0) == -1) {await ErrorType('E1')}
	localData = await CallStorage('pull')
	console.log('localData')
	return localData = JSON.parse(localData)
}
function reset_color() {return console.log('\x1b[0m')}