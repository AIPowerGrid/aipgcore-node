aipgcore Node
============

A aipgcoin full node for building applications and services with Node.js. A node is extensible and can be configured to run additional services. At the minimum a node has an interface to [aipgcoin with additional indexing](https://github.com/underdarkskies/aipgcoin/tree/0.15.0-aipgcore) for more advanced address queries. Additional services can be enabled to make a node more useful such as exposing new APIs, running a block explorer and wallet service.

## Install

```bash
npm install -g aipgcore-node
aipgcore-node start
```

Note: For your convenience, we distribute aipgd binaries for x86_64 Linux and x86_64 Mac OS X. Upon npm install, the binaries for your platform will be downloaded. For more detailed installation instructions, or if you want to compile the project yourself, then please see the aipgcore branch of [aipgcoin with additional indexing](https://github.com/underdarkskies/aipgcoin/tree/0.15.0-aipgcore).

## Prerequisites

- GNU/Linux x86_32/x86_64, or OSX 64bit *(for aipgd distributed binaries)*
- Node.js v0.10, v0.12 or v4
- ZeroMQ *(libzmq3-dev for Ubuntu/Debian or zeromq on OSX)*
- ~200GB of disk storage
- ~8GB of RAM

## Configuration

aipgcore includes a Command Line Interface (CLI) for managing, configuring and interfacing with your aipgcore Node.

```bash
aipgcore-node create -d <aipgcoin-data-dir> mynode
cd mynode
aipgcore-node install <service>
aipgcore-node install https://github.com/yourname/helloworld
```

This will create a directory with configuration files for your node and install the necessary dependencies. For more information about (and developing) services, please see the [Service Documentation](docs/services.md).

## Add-on Services

There are several add-on services available to extend the functionality of aipgcore:

- [Insight API](https://github.com/underdarkskies/insight-api)
- [Insight UI](https://github.com/underdarkskies/insight-ui)
- [aipgcore Wallet Service](https://github.com/AIPowerGrid/aipgcore-wallet-service)

## Documentation

- [Upgrade Notes](docs/upgrade.md)
- [Services](docs/services.md)
  - [aipgd](docs/services/aipgd.md) - Interface to aipgcoin Core
  - [Web](docs/services/web.md) - Creates an express application over which services can expose their web/API content
- [Development Environment](docs/development.md) - Guide for setting up a development environment
- [Node](docs/node.md) - Details on the node constructor
- [Bus](docs/bus.md) - Overview of the event bus constructor
- [Release Process](docs/release.md) - Information about verifying a release and the release process.

## Contributing

Please send pull requests for bug fixes, code optimization, and ideas for improvement. For more information on how to contribute, please refer to our [CONTRIBUTING](https://github.com/AIPowerGrid/aipgcore/blob/master/CONTRIBUTING.md) file.

## License

Code released under [the MIT license](https://github.com/AIPowerGrid/aipgcore-node/blob/master/LICENSE).

Copyright 2018-2019 UnderDarkSkies

Copyright 2013-2015 BitPay, Inc.

- bitcoin: Copyright (c) 2009-2015 Bitcoin Core Developers (MIT License)