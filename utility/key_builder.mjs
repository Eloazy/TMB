// https://api.torn.com/    /       ?selections=      &key=      &comment=   get user
// https://api.torn.com/    /?selections=      &key=      &comment=   get something

var FullKey = "https://api.torn.com/"
const aditional = "/"
const SecondPart ="?selections="
const ThirtPart = "&key=" 
const FourthPart = "&comment=" // create a comentair

export async function keyBuild(key, module, inform, reason) {
	if (reason == "profile") {FullKey = FullKey.concat(module, aditional, inform, SecondPart, reason, ThirtPart, key, FourthPart, reason)}
	else if (reason == "getFactionUsers") {FullKey = FullKey.concat(module, aditional, inform, SecondPart, 'basic', ThirtPart, key, FourthPart, reason)}
	else if(reason !== "none") {FullKey = FullKey.concat(module, SecondPart, inform, ThirtPart, key, FourthPart, reason)}
	else {FullKey = FullKey.concat(module, SecondPart, inform, ThirtPart, key, FourthPart, "MedBay")}
	return await pullServer()
}

async function pullServer() {
	var Data = null
	await fetch(FullKey).then(response => {
		if(!response.ok) {key_valid = false; return}
		return response.json()
	}).then(data => {Data = data})
	FullKey = "https://api.torn.com/"
	return Data
}