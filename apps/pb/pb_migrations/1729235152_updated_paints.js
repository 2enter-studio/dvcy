/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s4rv9pmgeg1obr7")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "moyegbvy",
    "name": "source",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "chiayiartmuseum",
        "youtube"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s4rv9pmgeg1obr7")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "moyegbvy",
    "name": "source",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "exhibit",
        "youtube"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
