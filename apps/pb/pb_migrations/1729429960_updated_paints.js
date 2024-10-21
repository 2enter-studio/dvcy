/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s4rv9pmgeg1obr7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i459ehkx",
    "name": "locale",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "zh-tw",
        "en"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s4rv9pmgeg1obr7")

  // remove
  collection.schema.removeField("i459ehkx")

  return dao.saveCollection(collection)
})
