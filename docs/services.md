# Services
aipgcore Node has a service module system that can start up additional services that can include additional:
- Blockchain indexes (e.g. querying balances for addresses)
- API methods
- HTTP routes
- Event types to publish and subscribe

The `aipgcore-node.json` file describes which services will load for a node:

```json
{
  "services": [
    "aipgd", "web"
  ]
}
```

Services correspond with a Node.js module as described in 'package.json', for example:

```json
{
  "dependencies": {
    "aipgcore-lib": "AIPowerGrid/aipgcore-lib",
    "aipgcore-node": "AIPowerGrid/aipgcore-node",
    "insight-api": "underdarkskies/insight-api"
  }
}
```

_Note:_ If you already have a aipgcore-node database, and you want to query data from previous blocks in the blockchain, you will need to reindex. Reindexing right now means deleting your aipgcore-node database and resyncing.

## Using Services Programmatically
If, instead, you would like to run a custom node, you can include services by including them in your configuration object when initializing a new node.

```js
//Require aipgcore
var aipgcore = require('aipgcore-node');

//Services
var aipgcoin = aipgcore.services.aipgcoin;
var Web = aipgcore.services.Web;

var myNode = new aipgcore.Node({
  network: 'regtest'
  services: [
    {
      name: 'aipgd',
      module: aipgcoin,
      config: {
        spawn: {
          datadir: '/home/<username>/.aipg',
          exec: '/home/<username>/aipgcore-node/bin/aipgd'
        }
      }
    },
    {
      name: 'web',
      module: Web,
      config: {
        port: 3001
      }
    }
  ]
});
```

Now that you've loaded your services you can access them via `myNode.services.<service-name>.<method-name>`. For example if you wanted to check the balance of an address, you could access the address service like so.

```js
myNode.services.aipgd.getAddressBalance('1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v', false, function(err, total) {
  console.log(total.balance); //Satoshi amount of this address
});
```

## Writing a Service
A new service can be created by inheriting from `Node.Service` and implementing these methods and properties:
- `Service.dependencies` -  An array of services that are needed, this will determine the order that services are started on the node.
- `Service.prototype.start()` - Called to start up the service.
- `Service.prototype.stop()` - Called to stop the service.
- `Service.prototype.blockHandler()` - Will be called when a block is added or removed from the chain, and is useful for updating a database view/index.
- `Service.prototype.getAPIMethods()` - Describes which API methods that this service includes, these methods can then be called over the JSON-RPC API, as well as the command-line utility.
- `Service.prototype.getPublishEvents()` - Describes which events can be subscribed to for this service, useful to subscribe to events over the included web socket API.
- `Service.prototype.setupRoutes()` - A service can extend HTTP routes on an express application by implementing this method.

The `package.json` for the service module can either export the `Node.Service` directly, or specify a specific module to load by including `"aipgcoreNode": "lib/aipgcore-node.js"`.

Please take a look at some of the existing services for implementation specifics.
