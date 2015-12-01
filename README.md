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
same-origin redirect. Server and client then reflect whether the
`Authorization` header survived the redirect.

Built to test for discrepancies between `Authorization` header preservation
across different browsers and operating systems.

### [Common crashing bugs](https://http-playground.herokuapp.com/crashers)

Links to a variety of common browser-crashing bugs, particularly those related
to extreme memory pressure.

Built to test edge-case behavior in mobile browsers and WebView
implementations, particularly `SFSafariViewController` in iOS 9 with
[`SFSafariViewControllerPlayground`](https://github.com/jamesreggio/SFSafariViewControllerPlayground).

## How to run locally

Ensure `./node_modules/.bin` is in your path, then run:

```bash
npm install
npm start
open http://localhost:3000
```
