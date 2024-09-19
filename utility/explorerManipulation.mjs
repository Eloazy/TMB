import open, { openApp, apps} from 'open'
const defaultURL = 'https://www.torn.com/profiles.php?XID='
var targetURL = defaultURL

export async function openBrownser(IDs) {
	console.log(IDs)
	for(var i = 0; i<IDs.length; i++) {
		console.log('uwu')
		targetURL = targetURL.concat(IDs[i])
		console.log(targetURL)
		await open(targetURL)
		targetURL = defaultURL;
	}
}