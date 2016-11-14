.PHONY: server install lint

server: install
	$$(npm bin)/nodemon

lint:
	@$$(npm bin)/eslint .

install: node_modules

node_modules: package.json
	@npm install
	@touch $@

docs/example.csv:
	$$(npm bin)/gsheets \
		--key=1Mt6xzEGcuO9cusTUB3q3JwhNOZbhwHK71TfpOaUWS9c --title=charts \
		--out $@ --csv
