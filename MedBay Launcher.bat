if not exist node_modules (
	start sys/dependencies.vbs
)
if exist node_modules (
	node medbay.mjs
)


