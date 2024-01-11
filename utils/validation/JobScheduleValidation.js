/**
 * JobScheduleValidation.js
 * @description :: validate each post and put request as per JobSchedule model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of JobSchedule */
exports.schemaKeys = joi.object({
  Phone_Number: joi.string().allow(null).allow(''),
  Checkbox: joi.string().allow(null).allow(''),
  Date: joi.string().allow(null).allow(''),
  Time: joi.string().allow(null).allow(''),
  Name: joi.string().allow(null).allow(''),
  Address: joi.string().allow(null).allow(''),
  Location: joi.string().allow(null).allow(''),
  Company_Name: joi.string().allow(null).allow(''),
  Org_Number: joi.string().allow(null).allow(''),
  Job_Note: joi.string().allow(null).allow(''),
  JobStaus: joi.string().allow(null).allow(''),
  PaymentVia: joi.string().allow(null).allow(''),
  Amount: joi.string().allow(null).allow(''),
  DriverNote: joi.string().allow(null).allow(''),
  ImageBefore: joi.string().allow(null).allow(''),
  ImageAfter: joi.string().allow(null).allow(''),
  PaymentStatus: joi.string().allow(null).allow(''),
  Assigned_to: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of JobSchedule for updation */
exports.updateSchemaKeys = joi.object({
  Phone_Number: joi.string().allow(null).allow(''),
  Checkbox: joi.string().allow(null).allow(''),
  Date: joi.string().allow(null).allow(''),
  Time: joi.string().allow(null).allow(''),
  Name: joi.string().allow(null).allow(''),
  Address: joi.string().allow(null).allow(''),
  Location: joi.string().allow(null).allow(''),
  Company_Name: joi.string().allow(null).allow(''),
  Org_Number: joi.string().allow(null).allow(''),
  Job_Note: joi.string().allow(null).allow(''),
  JobStaus: joi.string().allow(null).allow(''),
  PaymentVia: joi.string().allow(null).allow(''),
  Amount: joi.string().allow(null).allow(''),
  DriverNote: joi.string().allow(null).allow(''),
  ImageBefore: joi.string().allow(null).allow(''),
  ImageAfter: joi.string().allow(null).allow(''),
  PaymentStatus: joi.string().allow(null).allow(''),
  Assigned_to: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of JobSchedule for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      Phone_Number: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Checkbox: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Date: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Time: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Address: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Location: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Company_Name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Org_Number: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Job_Note: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      JobStaus: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      PaymentVia: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Amount: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      DriverNote: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      ImageBefore: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      ImageAfter: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      PaymentStatus: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Assigned_to: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
