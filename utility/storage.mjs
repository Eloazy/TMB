// storage system
import * as fs from 'fs'
// callStorage recive all calls in program and manage to key, permission and test

//TestStorageCall()

export async function CallStorage(method) {
	if(method == 0) {
		if(await TestStorageCall() == false) {return -1} // return error JSON not found
		else {return 0}
	} 
	else if(method == 'pull') {return pull()}
	else if(method == 'push') {return}
	else {console.error('error in callStorage method: ', method)}
}
function pull() {return fs.readFileSync('./utility/storage/storage.json', 'utf8')}

// security
async function TestStorageCall() {try{fs.readFileSync('./utility/storage/storage.json', 'utf8')}catch{return false}}