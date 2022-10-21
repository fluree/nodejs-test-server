# nodejs-test-server

## How do I work with an unreleased `flureenjs` build?

First, make sure you have a compatible version of Fluree ledger running locally on your machine. In the `fluree/ledger` repo, check out the relevant branch, and then compile the ledger. Finally, go to the `build/` directory, and start the ledger.

In the `fluree/db` repo, checkout the branch that you would like to build from (JSON-LD features can currently be found on the `feature/jld` branch). In the project root, run `make nodejs`. This should produce a file (`out/nodejs/flureenjs.js`) that contains the compiled code.

Copy the `flureenjs.js` file to the `js-packages/nodejs` directory, and run `npm i` in that directory, if you haven't already. Then run `npm link`.

To use the locally compiled library in a project on your machine, simply run `npm link @fluree/flureenjs`, and then import with `const flureenjs = require("@fluree/flureenjs")`.

**If using the IPFS storage option, you will need IPFS running as well**