# hastebin-v1

Fork of [`hastebin`](https://npmjs.com/package/hastebin) that is actively maintained.

## Why does this fork exist?

The upstream module does not appear to be actively maintained anymore, so I have taken it into my own hands. I use this module in one of my projects, [Lexi](https://github.com/thetayloredman/Lexi) so I wanted a stable interface.

## What changed?

This package has a much more specific scope than `hastebin`. It simply aims to handle using Haste from within programs, and does not take on the CLI application role of haste-client.

Because of Hastebin being recently acquired by Toptal, this package only supports a v1 haste-server. The default server has been changed to my server, [paste.0xlogn.dev](https://paste.0xlogn.dev/) for this reason.

## Installation

`hastebin-v1` supports Node.js 16 and 18.

```
$ npm install hastebin-v1
```

## Usage

```js
const hastebin = require("hastebin-v1");

hastebin
    .createPaste(
        "content for your paste",
        {
            raw: true,
            contentType: "text/plain",
            server: "https://hastebin.com"
        },
        /* options for the 'got' module here */ {}
    )
    .then(function (urlToPaste) {})
    .catch(function (requestError) {});
```

## License

This module is licensed under the MIT license.
