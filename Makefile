.PHONY: install install lint

server: install
	$$(npm bin)/nodemon

lint:
	@$$(npm bin)/eslint .

install: node_modules

node_modules: package.json
	@npm install
	@touch $@
