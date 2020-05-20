install:
	npm install

start:
	node bin/gendiff.js

dry-run:
	npm publish --dry-run

relink:
	npm unlink --force
	npm link

lint:
	npx eslint .

test:
	npx jest --passWithNoTests

test-coverage:
	npx jest --coverage --ci