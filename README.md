# Note taking

A note taking app implementing draft rte with **react**, **express** and **mongodb**. Semantic UI is used for styling components.

## Setup

Install dependencies :
```sh
npm install
```

## Usage

Start local dev servers with concurrently (webpack react server, mongodb, express) :  
**=> mongodb local server required**
```sh
npm start
```

Load welcome note (optional) :
```sh
npm run fixtures
```

## Features

- display a rich text editor
- add styles : bold, italic, underline, strikethrough, quotes, code, ul/ol lists
- auto-save
- list notes
- create, rename, edit and delete a note
