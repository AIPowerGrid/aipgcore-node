# Setting up Development Environment

## Install Node.js

Install Node.js by your favorite method, or use Node Version Manager by following directions at https://github.com/creationix/nvm

```bash
nvm install v4
```

## Fork and Download Repositories

To develop aipgcore-node:

```bash
cd ~
git clone git@github.com:<yourusername>/aipgcore-node.git
git clone git@github.com:<yourusername>/aipgcore-lib.git
```

To develop aipgcoin or to compile from source:

```bash
git clone git@github.com:<yourusername>/aipgcoin.git
git fetch origin <branchname>:<branchname>
git checkout <branchname>
```
**Note**: See aipgcoin documentation for building aipgcoin on your platform.


## Install Development Dependencies

For Ubuntu:
```bash
sudo apt-get install libzmq3-dev
sudo apt-get install build-essential
```
**Note**: Make sure that libzmq-dev is not installed, it should be removed when installing libzmq3-dev.


For Mac OS X:
```bash
brew install zeromq
```

## Install and Symlink

```bash
cd aipgcore-lib
npm install
cd ../aipgcore-node
npm install
```
**Note**: If you get a message about not being able to download aipgcoin distribution, you'll need to compile aipgd from source, and setup your configuration to use that version.


We now will setup symlinks in `aipgcore-node` *(repeat this for any other modules you're planning on developing)*:
```bash
cd node_modules
rm -rf aipgcore-lib
ln -s ~/aipgcore-lib
rm -rf aipgd-rpc
ln -s ~/aipgd-rpc
```

And if you're compiling or developing aipgcoin:
```bash
cd ../bin
ln -sf ~/aipgcoin/src/aipgd
```

## Run Tests

If you do not already have mocha installed:
```bash
npm install mocha -g
```

To run all test suites:
```bash
cd aipgcore-node
npm run regtest
npm run test
```

To run a specific unit test in watch mode:
```bash
mocha -w -R spec test/services/aipgd.unit.js
```

To run a specific regtest:
```bash
mocha -R spec regtest/aipgd.js
```

## Running a Development Node

To test running the node, you can setup a configuration that will specify development versions of all of the services:

```bash
cd ~
mkdir devnode
cd devnode
mkdir node_modules
touch aipgcore-node.json
touch package.json
```

Edit `aipgcore-node.json` with something similar to:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "aipgd",
    "web",
    "insight-api",
    "insight-ui",
    "<additional_service>"
  ],
  "servicesConfig": {
    "aipgd": {
      "spawn": {
        "datadir": "/home/<youruser>/.aipgd",
        "exec": "/home/<youruser>/aipgcoin/src/aipgd"
      }
    }
  }
}
```

**Note**: To install services [insight-api](https://github.com/underdarkskies/insight-api) and [insight-ui](https://github.com/underdarkskies/insight-ui) you'll need to clone the repositories locally.

Setup symlinks for all of the services and dependencies:

```bash
cd node_modules
ln -s ~/aipgcore-lib
ln -s ~/aipgcore-node
ln -s ~/insight-api
ln -s ~/insight-ui
```

Make sure that the `<datadir>/aipg.conf` has the necessary settings, for example:
```
server=1
whitelist=127.0.0.1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
zmqpubrawtx=tcp://127.0.0.1:28332
zmqpubhashblock=tcp://127.0.0.1:28332
rpcallowip=127.0.0.1
rpcuser=aipgcoin
rpcpassword=local321
```

From within the `devnode` directory with the configuration file, start the node:
```bash
../aipgcore-node/bin/aipgcore-node start
```
