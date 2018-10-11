
/**
 * api.js mock.
 */

const notes = [
  {
    "name": "Welcome",
    "entityMap": {},
    "blocks": [
      {
        "key": "8i5rc",
        "text": "Welcome to Note taking !",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [
          {
            "offset": 0,
            "length": 24,
            "style": "BOLD"
          }
        ],
        "entityRanges": [],
        "data": {}
      },
      {
        "key": "a392a",
        "text": "",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      },
      {
        "key": "899no",
        "text": "You are free to create your note, please enjoy ;)",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      },
      {
        "key": "dd4je",
        "text": "",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      },
      {
        "key": "au5j1",
        "text": "Burrich",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }
    ]
  },
  {
    "name": "Note 1",
    "entityMap": {},
    "blocks": [
      {
        "key": "5atf5",
        "text": "foo",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }
    ]
  },
  {
    "name": "Note 2",
    "entityMap": {},
    "blocks": [
      {
        "key": "5atf5",
        "text": "bar",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }
    ]
  }
];

function getNotes(callback) {
  callback(null, notes);
}

export { getNotes };