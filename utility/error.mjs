const errorData = {
	E1:'JSON NOT FOUND - REINSTALL PROGRAM!!'
}

export async function ErrorType(ErrorCode) {
	if(ErrorCode == 'E1'){console.error('\x1b[31m', errorData.E1)}
	console.log('> ignore the error below, its the force stop generator')
	console.log('\n')
	console.log('\x1b[0m')
	Execute_Forced_Stop()
}
function Execute_Forced_Stop() {Error_generator_stopJS_execution()}