/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s4rv9pmgeg1obr7")

  collection.name = "paints"

  // remove
  collection.schema.removeField("0mxf8tsa")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pnkrooue",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "0",
        "1",
        "2",
        "3",
        "4"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c0fodnqu",
    "name": "draw_duration",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i1mcoxnk",
    "name": "user_agent",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s4rv9pmgeg1obr7")

  collection.name = "data"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0mxf8tsa",
    "name": "text",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("pnkrooue")

  // remove
  collection.schema.removeField("c0fodnqu")

  // remove
  collection.schema.removeField("moyegbvy")

  // remove
  collection.schema.removeField("swpx7wjb")

  // remove
  collection.schema.removeField("i1mcoxnk")

  return dao.saveCollection(collection)
})
