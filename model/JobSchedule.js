/**
 * JobSchedule.js
 * @description :: sequelize model of database table JobSchedule
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let JobSchedule = sequelize.define('JobSchedule',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  Phone_Number:{ type:DataTypes.STRING },
  Checkbox:{ type:DataTypes.STRING },
  Date:{ type:DataTypes.STRING },
  Time:{ type:DataTypes.STRING },
  Name:{ type:DataTypes.STRING },
  Address:{ type:DataTypes.STRING },
  Location:{ type:DataTypes.STRING },
  Company_Name:{ type:DataTypes.STRING },
  Org_Number:{ type:DataTypes.STRING },
  Job_Note:{ type:DataTypes.STRING },
  JobStaus:{ type:DataTypes.STRING },
  PaymentVia:{ type:DataTypes.STRING },
  Amount:{ type:DataTypes.STRING },
  DriverNote:{ type:DataTypes.STRING },
  ImageBefore:{ type:DataTypes.STRING },
  ImageAfter:{ type:DataTypes.STRING },
  PaymentStatus:{ type:DataTypes.STRING },
  Assigned_to:{ type:DataTypes.STRING },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (JobSchedule,options){
        JobSchedule.isActive = true;
        JobSchedule.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (JobSchedule,options){
        if (JobSchedule !== undefined && JobSchedule.length) { 
          for (let index = 0; index < JobSchedule.length; index++) { 
        
            const element = JobSchedule[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
JobSchedule.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(JobSchedule);
sequelizePaginate.paginate(JobSchedule);
module.exports = JobSchedule;
