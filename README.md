# Aragon React from ChainShot 

Congratulations on completing the Aragon Voting application on ChainShot!

This project setup is based on the React boilerplate for Aragon applications.

This boilerplate also includes a fully working example app, complete with a background worker and a front-end in React (with Aragon UI).

## Prerequisites

- [**Node/NPM**](https://nodejs.org/en/): For installing dependencies and running your app
- [**IPFS**](https://ipfs.io/docs/install/): For serving the HTML files
- [**truffle**](https://github.com/trufflesuite/truffle): Used to build and test the contracts
- [**Aragon CLI**](https://github.com/aragon/aragon-cli): You can install it using `npm i -g @aragon/cli` on your command line
- [**MetaMask**](https://metamask.io/): Use metamask to send ethereum transactions from your browser.

Once you've installed all these pre-requisites you'll be able to use all the `npm` commands 
to run, test and publish your application!

## Running the application

1. Install the prerequisite technologies listed above.
2. Run `npm start` to kick off the Aragon CLI and bring your application to life.
3. Once your app has been started Aragon CLI will give you a private key for an address. Import this key into metamask to run transactions from this account. 

## What's in the box?

### npm Scripts

- **start**: Run the app locally
- **compile**: Compile the smart contracts
- **build**: Compiles the contracts and builds the front-end
- **test**: Runs tests for the contracts
- **publish**: Builds the apps and the contracts and publishes them to IPFS and APM

### Libraries

- [**@aragon/os**](https://github.com/aragon/aragonos): Aragon interfaces
- [**@aragon/client**](https://github.com/aragon/aragon.js/tree/master/packages/aragon-client): Wrapper for Aragon application RPC
- [**@aragon/ui**](https://github.com/aragon/aragon-ui): Aragon UI components (in React)

### Learn More 

Always check back at www.chainshot.com to learn more or join our 
[Slack channel](https://join.slack.com/t/chainshotnodes/shared_invite/enQtMzU3ODc5NTM3MTI3LTFlZTY1YzcwM2QzYWI0ODY2ZDczMmYzOTVlYWQwZjkyZDFlYzUxZWM4NDNlNjk3N2EyNGMwOGQ0ZTVkZjQyNjE)