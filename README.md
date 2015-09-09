# http-playground

Simple [`express`](http://expressjs.com)-based HTTP server for testing.

## Modules

### [Synthetic response generator](https://http-playground.herokuapp.com/synthetic)

Generates responses with synthetic HTTP statuses. Supports redirects with
configurable delays. Utilizes HTTP streaming and slow-loading assets to audit
and delay `document.DOMContentLoaded` and `window.load` events.

Built to test delegate callbacks for `SFSafariViewController` in iOS 9 with
[`SFSafariViewControllerPlayground`](https://github.com/jamesreggio/SFSafariViewControllerPlayground).

## How to run locally

```base
npm install
npm start
open http://localhost:3000
```
