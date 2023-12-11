const db = require("../model.js");
const Compound = db.compounds;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {

  if (!req.body.CompoundName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const compound = {
    id: req.body.id,
    CompoundName: req.body.CompoundName,
    CompoundDescription: req.body.CompoundDescription,
    strImageSource: req.body.strImageTitle,
    strImageAttribution: req.body.strImageAttribution,
    dateModified: req.body.dateModified

    
  };

    Compound.create(compound)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Compound item."
      });
    });
};


exports.findAll = (req, res) => {
 
  const CompoundName = req.query.CompoundName;
 
  var condition = CompoundName ? { CompoundName: { [Op.like]: `%${CompoundName}%` } } : null;

  
  Compound.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};


//search by id - Retrieve operation

exports.findOne = (req, res) => {
  const id = req.params.id;

  Compound.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Compound with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Compound with id=" + id
      });
    });
};

//update operation

exports.update = (req, res) => {
  const id = req.params.id;

 
  Compound.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Compound item was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Compound item with id=${id}. Maybe Compound was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Compound item with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

 
  Compound.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Compound item was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Compound item with id=${id}. Maybe Compound item was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Compound item with id=" + id
      });
    });
};


exports.deleteAll = (req, res) => {
 
  Compound.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} All compounds were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all compounds."
      });
    });
};

