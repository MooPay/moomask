# MOOMASK

MooMask is a browser extension wallet for Binance SmartChain.  For safety, always logout your wallet after using it. Private key for your wallet is stored locally in your browser only.

## Features
* Generate a new wallet.
* Import wallet from private key.
* Export private key.
* View BNB, BEP-20 and Peggy Token balances.
* View wallet address with the QR code.
* View recent transactions.
* Send & receive BNB, BEP-20 and Peggy Tokens.
* Switch the network between Mainnet and Testnet.

## Manual Installation
* Download _moomask.zip_ from the *zip* folder.
* Unzip _moomask.zip_.
* Go to Chrome Extensions page and activate the Developer Mode.
* Click Load Unpacked button and point it to moomask folder.

## Build Extension

* Install [node.js](https://nodejs.org/) and npm.
* Install dependencies :
  ```
  npm install
  ```
* Run the project :
  ```
  npm run start
  ```
* Uncompressed build can be found in `/dist` folder.
* Go to Chrome Extensions page and activate the Developer Mode.
* Click `Load Unpacked` button and point it to `/dist` folder.

## Development
* Install [node.js](https://nodejs.org/) and npm.
* Install dependencies :
  ```
  npm install
  ```
* Run the project :
  ```
  npm run start
  ```

## Tech
* This wallet is built with [React](https://reactjs.org/).