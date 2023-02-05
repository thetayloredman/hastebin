# hastebin-v1

Fork of [`hastebin`](https://npmjs.com/package/hastebin) that is actively maintained.

## Why does this fork exist?

The upstream module does not appear to be actively maintained anymore, so I have taken it into my own hands. I use this module in one of my projects, [Lexi](https://github.com/thetayloredman/Lexi). I wanted a stable interface to use for my project, so I decided to fork the module and maintain it myself.

## What changed?

This package has a much more specific scope than `hastebin`. It simply aims to handle using Haste from within Node.js programs, and does not take on the CLI application role of haste-client.

Because of Hastebin being recently acquired by Toptal, this package only supports a v1 haste-server. The default server has been changed to my server, [paste.0xlogn.dev](https://paste.0xlogn.dev/) for this reason.

This module is also fully ESM and is written in TypeScript.

## Installation

`hastebin-v1` requires Node.js v18 or above due to its use of `node:fetch`.

```
$ npm install hastebin-v1
```

## Usage

```js
import hastebin from "hastebin-v1";

hastebin(
    "content for your paste",
    {
        raw: true,
        contentType: "text/plain",
        server: "https://your-hastebin-instance.com"
    }
)
    .then(function (urlToPaste) {})
    .catch(function (requestError) {});
```

## License

This module is licensed under the MIT license.
