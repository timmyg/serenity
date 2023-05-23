## Serenity

##### Development

Build iohook natively for electron. [this](https://github.com/wilix-team/iohook) is the main repo but [this fork](https://github.com/MystK/iohook) is updated more recently. Try cloning the fork and running `npm i` then `npm run build`, and a new build should show up under `builds`.

For example, on my m1 macbook it creates `builds/electron-v110-darwin-arm64`. It may take some debugging to build natively, and you'll need to copy and paste it into `node_modules/iohook/builds` or maybe `webpack/main/builds` (should happen via `CopyPlugin` in `main.webpack.js`)
