# Note taking

A note taking app implementing **draft** RTE with **react**, **express** and **mongodb**. Semantic UI is used for styling components.

## Setup

Install dependencies :
```sh
npm install
npm install -g pow-mongodb-fixtures foreman
```

Create database and insert data :
```sh
mongo
use noteTakingDB
db.createCollection("notes")
```

```sh
mongofixtures noteTakingDB fixtures.js
```

## Usage

Start local dev servers with foreman (webpack react server, mongodb, express) :
```sh
npm start
```

## Features

- display a rich text editor
- add styles : bold, italic, underline, strikethrough, quotes, code, ul/ol lists
- auto-save
- list notes
- create, rename, edit and delete a note
