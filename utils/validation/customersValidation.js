/**
 * customersValidation.js
 * @description :: validate each post and put request as per customers model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of customers */
exports.schemaKeys = joi.object({
  PhoneNumber: joi.string().allow(null).allow(''),
  Name: joi.string().allow(null).allow(''),
  Email: joi.string().allow(null).allow(''),
  Address: joi.string().allow(null).allow(''),
  Pincode: joi.string().allow(null).allow(''),
  Customer_type: joi.string().allow(null).allow(''),
  org_no: joi.string().allow(null).allow(''),
  org_name: joi.string().allow(null).allow(''),
  org_email: joi.string().allow(null).allow(''),
  org_address: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of customers for updation */
exports.updateSchemaKeys = joi.object({
  PhoneNumber: joi.string().allow(null).allow(''),
  Name: joi.string().allow(null).allow(''),
  Email: joi.string().allow(null).allow(''),
  Address: joi.string().allow(null).allow(''),
  Pincode: joi.string().allow(null).allow(''),
  Customer_type: joi.string().allow(null).allow(''),
  org_no: joi.string().allow(null).allow(''),
  org_name: joi.string().allow(null).allow(''),
  org_email: joi.string().allow(null).allow(''),
  org_address: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of customers for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      PhoneNumber: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Address: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Pincode: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Customer_type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      org_no: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      org_name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      org_email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      org_address: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
