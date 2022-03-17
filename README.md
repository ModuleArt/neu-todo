# NeuTodo

Simple cross-platform todo app, built on top of Typescript, Vue, Vuetify and Neutralinojs

## Scripts

#### 🛠 Dev

Install dependencies:

```bash
yarn && yarn update
```

Open for development:

```bash
yarn dev
```

Visit `http://localhost:8090/` to preview.

<hr />

#### 🏗 Build

Build base for all platforms:

```bash
yarn build
```

Build for web (GitHub pages):

```bash
yarn build-github
```

Build for desktop (MacOS, Windows, Linux):

```bash
yarn build-desktop
```

<hr />

#### 🖥 Run

Debug on your system (Neutralino):

```bash
yarn open-desktop
```

Debug android build (Android Studio):

```bash
yarn open-android
```

Debug iOS build (Android Studio):

```bash
yarn open-ios
```

## Contribution guide

##### 1. Fork

##### 2. Create new branch

```bash
git checkout dev
git checkout -b *name-of-branch*
```

Where `*name-of-branch*` could be `feature/*feature-name*` or `fix/*bug-name*`.

##### 3. Make your changes

##### 4. Create pull request to `dev` branch
