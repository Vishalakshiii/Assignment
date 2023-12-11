module.exports = app => {
    const compounds = require("../controllers/compound.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Compound
    router.post("/", compounds.create);
  
    // Retrieve all Compounds
    router.get("/", compounds.findAll);
  
  
    // Retrieve a single Compound with id
    router.get("/:id", compounds.findOne);
  
    // Update a Compound with id
    router.put("/:id", compounds.update);
  
    // Delete a Compound with id
    router.delete("/:id", compounds.delete);
  
    // Delete all Compounds
    router.delete("/", compounds.deleteAll);
  
    app.use('/api/compounds', router);
  };
  