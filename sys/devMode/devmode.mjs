import * as fs from 'fs'
import 'dotenv/config'

export function testDevMode() {
	if (fs.existsSync('.env')) {return process.env.key}
	else {return false}
}