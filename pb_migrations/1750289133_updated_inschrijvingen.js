/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_731085774")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_pZ78F1qJsN` ON `inschrijvingen1` (`email`)"
    ],
    "name": "inschrijvingen1"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_731085774")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_pZ78F1qJsN` ON `inschrijvingen` (`email`)"
    ],
    "name": "inschrijvingen"
  }, collection)

  return app.save(collection)
})
