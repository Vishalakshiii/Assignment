module.exports = (sequelize, Sequelize) => {
    const Compound = sequelize.define("compound", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      CompoundName: {
        type: Sequelize.STRING
      },
      CompounrDescription: {
        type: Sequelize.STRING
      },
      strImageSource: {
        type: Sequelize.STRING
      },
      strImageAttribution:{
        type: Sequelize.STRING
      },
      dateModified:{
        type: Sequelize.DATE
    }

    });
  
    return Compound;
  };