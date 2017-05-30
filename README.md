# lm-digital-store

Leroy Merlin Kiosk app built on top of:
[electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate), which you should **always refer to in case of problems**.

> Using: [React](https://facebook.github.io/react/), [Redux](https://github.com/reactjs/redux), [Redux-Saga](https://github.com/redux-saga/redux-saga), [React Router](https://github.com/reactjs/react-router), [Jest](https://github.com/facebook/jest).

## Install

* **Note: requires a node version >= 6 and an npm version >= 3.**
* **If you have installation or compilation issues with this project, please see [electron-react-boilerplate's official guide](https://github.com/chentsulin/electron-react-boilerplate/issues/400)**

First, clone the repo via git:

```bash
git clone https://github.com/Byte-Code/lm-digitalstore
```

And then install dependencies.

**ProTip**: Install with [yarn](https://github.com/yarnpkg/yarn) for faster and safer installation:
```bash
$ cd your-project-name && yarn
```

Or old school cool:
```bash
$ cd your-project-name && npm install
```

## Run

Run these two commands __simultaneously__ in different console tabs.

```bash
$ npm run hot-server
$ npm run start-hot
```

or run two servers with one command

```bash
$ npm run dev
```

## DevTools

#### Toggle Chrome DevTools

- OS X: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>

*See [electron-debug](https://github.com/sindresorhus/electron-debug) for more information.*

#### DevTools extension

This boilerplate is included following DevTools extensions:

* [Devtron](https://github.com/electron/devtron) - Install via [electron-debug](https://github.com/sindresorhus/electron-debug).
* [React Developer Tools](https://github.com/facebook/react-devtools) - Install via [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer).
* [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) - Install via [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer).

## Packaging

To package apps for the local platform:

```bash
$ npm run package
```

To package apps for all platforms:

First, refer to [Multi Platform Build](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build) for dependencies.

Then,
```bash
$ npm run package-all
```

To package apps with options:

```bash
$ npm run package -- --[option]
```

## Release

**First, set GH_TOKEN as ENV variable.**

Upgrade version, then run:
```bash
$ yarn release
```

This will create a draft release on github, that you need to confirm.
#### Pre-Release

Before a pre-releases you should **remember to disable auto-update functionality** by commenting the appropriate lines.

**Also remember to tick the apposite checkbox before confirming the draft.**

## Further commands

To run the application without packaging run

```bash
$ npm run build
$ npm start
```

To run End-to-End Test

```bash
$ npm run build
$ npm run test-e2e
```

## Authors

- [Lorenzo Ferrario](https://github.com/spawner999)
- [Jaga Santagostino](https://github.com/kandros)
- [Rinaldo Rossi](https://github.com/rinaldorossi)

## Maintainers

- [Rinaldo Rossi](https://github.com/rinaldorossi)

## License
MIT ©
