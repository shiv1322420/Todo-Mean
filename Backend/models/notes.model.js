const {DataTypes} =  require('sequelize');
const sequelize =  require('../config/db');
const { Note_STATUS } = require('../constants');

const Note = sequelize.define('Note',{
id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
},
title:{
    type:DataTypes.STRING,
    allowNull:false
},
description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status:{
    type:DataTypes.ENUM(...Object.values(Note_STATUS)),
    allowNull:false,
    defaultValue:Note_STATUS.PENDING
  },
  createdAt: { 
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: { 
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});


// Syncing the model
Note.sync({ alter: true })
  .then(() => {
    console.log('Note table has been created or updated.');
  })
  .catch((error) => {
    console.error('Error syncing the Note model:', error);
  });
  
module.exports = Note;