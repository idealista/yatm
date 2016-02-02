all: clean build

build: configure compile

configure:
	node-gyp configure

compile:
	node-gyp build

test:
	npm test

clean:
	rm -f thumbnailer.node
	rm -rf build


.PHONY: clean test build compile all configure
