import open, { openApp, apps} from 'open'
import { CallStorage } from './storage.mjs'

const defaultURL = 'https://www.torn.com/profiles.php?XID='
const localData = JSON.parse(await CallStorage('pull'))
var targetURL = defaultURL

export async function openBrownser(IDs) {
	if(localData.permissions.protectionMode == true) {
		if (IDs.length > localData.permissions.limiterForProtection) {
			for(var i = 0; i<localData.permissions.limiterForProtection; i++) {
				targetURL = targetURL.concat(IDs[i])
				console.log(targetURL)
				await open(targetURL)
				targetURL = defaultURL;
			}			
		}
	}
	else {
		for(var i = 0; i<IDs.length; i++) {
			console.log('uwu')
			targetURL = targetURL.concat(IDs[i])
			console.log(targetURL)
			await open(targetURL)
			targetURL = defaultURL;
		}	
	}
}