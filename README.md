# http-playground

Simple [`express`](http://expressjs.com)-based HTTP server for testing.

## Modules

### [Synthetic response generator](https://http-playground.herokuapp.com/synthetic)

Generates responses with synthetic HTTP statuses. Supports redirects with
configurable delays. Utilizes HTTP streaming and slow-loading assets to audit
and delay `document.DOMContentLoaded` and `window.load` events.

Built to test delegate callbacks for `SFSafariViewController` in iOS 9 with
[`SFSafariViewControllerPlayground`](https://github.com/jamesreggio/SFSafariViewControllerPlayground).

### [Redirect `Authorization` headers](https://http-playground.herokuapp.com/authorization)

Client generates requests with `Authorization` headers and server forces a
same-origin redirect. The server and client then reflect whether the
`Authorization` header survived the redirect.

Built to test for discrepancies between `Authorization` header preservation
across different browsers and operating systems.

## How to run locally

```base
npm install
npm start
open http://localhost:3000
```
