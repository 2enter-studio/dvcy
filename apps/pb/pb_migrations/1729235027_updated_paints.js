/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s4rv9pmgeg1obr7")

  // remove
  collection.schema.removeField("swpx7wjb")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s4rv9pmgeg1obr7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "swpx7wjb",
    "name": "coordinate",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": -1,
      "max": 1,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
})
