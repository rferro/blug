
.PHONY: all

all: build

build:
	node_modules/.bin/coffee -cb --no-header index.coffee
