# Note taking

A note taking app implementing **draft** RTE with **react**, **express** and **mongodb**.

## Setup

Install dependencies :
```sh
npm install
```

Start mongodb server :
```sh
mongod --dbpath path
# path example : C:\MongoDB\data
```

Create database and insert data :
```sh
mongo
use noteTakingDB
db.createCollection("notes")
```

```sh
npm install pow-mongodb-fixtures -g
mongofixtures noteTakingDB fixtures.js
```

## Features

- display a rich text editor
- list notes (static)
- *coming...*
