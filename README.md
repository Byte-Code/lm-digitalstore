# lm-digitalstore

Kiosk App built on top of
[electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate), which you should **always refer to in case of problems**.

> Tech Stack:
[Electron](https://github.com/electron/electron),
[React](https://facebook.github.io/react/),
[Redux](https://github.com/reactjs/redux),
[Redux-Saga](https://github.com/redux-saga/redux-saga),
[React Router](https://github.com/reactjs/react-router),
[Jest](https://github.com/facebook/jest),
[Enzyme](https://github.com/airbnb/enzyme).

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

Or the old school cool way:
```bash
$ cd your-project-name && npm install
```

## Run

Development mode:

```bash
$ yarn dev
```

Production mode (without packaging):

* **Note: doing this is gonna throw an harmless error since electron auto-updater is not able to find the app-update.yml file. I suggest going through the packaging first if you need to test that functionality.**

```bash
$ yarn prod
```

## Packaging

To package apps for the local platform:

```bash
$ yarn package
```

To package apps for all platforms:

First, refer to [Multi Platform Build](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build) for dependencies.

Then,
```bash
$ yarn package-all
```

To package apps with options:

```bash
$ yarn package -- --[option]
```

## Release

**First, set GH_TOKEN as ENV variable.**

Upgrade version, then run:

```bash
$ yarn release
```

This will create a draft release on github, that you need to confirm.

#### Pre-Release

* **Note: before a pre-releases you should remember to disable auto-update functionality by commenting the appropriate lines.**
* **Remember to tick the apposite checkbox before confirming the draft.**

## Test

```bash
$ yarn test
```

## Authors

- [Lorenzo Ferrario](https://github.com/spawner999)
- [Jaga Santagostino](https://github.com/kandros)
- [Rinaldo Rossi](https://github.com/rinaldorossi)

## Maintainers

- [Rinaldo Rossi](https://github.com/rinaldorossi)

## License
MIT ©
