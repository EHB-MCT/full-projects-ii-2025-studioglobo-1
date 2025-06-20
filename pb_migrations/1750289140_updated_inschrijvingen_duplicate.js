/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2969266235")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_6LnURg29nT` ON `inschrijvingen` (`email`)",
      "CREATE UNIQUE INDEX `idx_tokenKey_pbc_2969266235` ON `inschrijvingen` (`tokenKey`)"
    ],
    "name": "inschrijvingen"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2969266235")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_6LnURg29nT` ON `inschrijvingen_duplicate` (`email`)",
      "CREATE UNIQUE INDEX `idx_tokenKey_pbc_2969266235` ON `inschrijvingen_duplicate` (`tokenKey`)"
    ],
    "name": "inschrijvingen_duplicate"
  }, collection)

  return app.save(collection)
})
