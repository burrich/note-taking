# Note taking

A note taking app implementing draft rte with **react**, **express** and **mongodb**. Semantic UI is used for styling components.

## Setup

Install dependencies :
```sh
npm install
```

Init test database (**mongodb local server required**) :
```sh
npm run start-db
npm run fixtures
```

## Usage

Start local dev servers concurrently (webpack react server, mongodb, express) :
```sh
npm start
```

## Features

- display a rich text editor
- add styles : bold, italic, underline, strikethrough, quotes, code, ul/ol lists
- auto-save
- list notes
- create, rename, edit and delete a note
