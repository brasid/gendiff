install:
	npm install
start:
	npx babel-node -- src/bin/difgenerator.js

publish:
	npm publish
lint:
	npx eslint .
