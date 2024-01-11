/**
 * JobScheduleController.js
 * @description :: exports action methods for JobSchedule.
 */

const JobSchedule = require('../../../model/JobSchedule');
const JobScheduleSchemaKey = require('../../../utils/validation/JobScheduleValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of JobSchedule in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created JobSchedule. {status, message, data}
 */ 
const addJobSchedule = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      JobScheduleSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdJobSchedule = await dbService.createOne(JobSchedule,dataToCreate);
    return  res.success({ data :createdJobSchedule });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of JobSchedule in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created JobSchedules. {status, message, data}
 */
const bulkInsertJobSchedule = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdJobSchedule = await dbService.createMany(JobSchedule,dataToCreate); 
      return  res.success({ data :{ count :createdJobSchedule.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of JobSchedule from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found JobSchedule(s). {status, message, data}
 */
const findAllJobSchedule = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundJobSchedule;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      JobScheduleSchemaKey.findFilterKeys,
      JobSchedule.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundJobSchedule = await dbService.count(JobSchedule, query);
      if (!foundJobSchedule) {
        return res.recordNotFound();
      } 
      foundJobSchedule = { totalRecords: foundJobSchedule };
      return res.success({ data :foundJobSchedule });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundJobSchedule = await dbService.paginate( JobSchedule,query,options);
    if (!foundJobSchedule){
      return res.recordNotFound();
    }
    return res.success({ data:foundJobSchedule }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of JobSchedule from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found JobSchedule. {status, message, data}
 */
const getJobSchedule = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundJobSchedule = await dbService.findOne(JobSchedule,{ id :id });
    if (!foundJobSchedule){
      return res.recordNotFound();
    }
    return  res.success({ data :foundJobSchedule });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of JobSchedule.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getJobScheduleCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      JobScheduleSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedJobSchedule = await dbService.count(JobSchedule,where);
    if (!countedJobSchedule){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedJobSchedule } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of JobSchedule with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated JobSchedule.
 * @return {Object} : updated JobSchedule. {status, message, data}
 */
const updateJobSchedule = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    delete dataToUpdate.addedBy;
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      JobScheduleSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedJobSchedule = await dbService.update(JobSchedule,query,dataToUpdate);
    return  res.success({ data :updatedJobSchedule }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of JobSchedule with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated JobSchedules.
 * @return {Object} : updated JobSchedules. {status, message, data}
 */
const bulkUpdateJobSchedule = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedJobSchedule = await dbService.update(JobSchedule,filter,dataToUpdate);
    if (!updatedJobSchedule){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedJobSchedule.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of JobSchedule with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated JobSchedule.
 * @return {Object} : updated JobSchedule. {status, message, data}
 */
const partialUpdateJobSchedule = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      JobScheduleSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedJobSchedule = await dbService.update(JobSchedule, query, dataToUpdate);
    if (!updatedJobSchedule) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedJobSchedule });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of JobSchedule from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of JobSchedule.
 * @return {Object} : deactivated JobSchedule. {status, message, data}
 */
const softDeleteJobSchedule = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(JobSchedule, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of JobSchedule from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted JobSchedule. {status, message, data}
 */
const deleteJobSchedule = async (req, res) => {
  const result = await dbService.deleteByPk(JobSchedule, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of JobSchedule in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyJobSchedule = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedJobSchedule = await dbService.destroy(JobSchedule,query);
    return res.success({ data :{ count :deletedJobSchedule.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of JobSchedule from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of JobSchedule.
 * @return {Object} : number of deactivated documents of JobSchedule. {status, message, data}
 */
const softDeleteManyJobSchedule = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    const options = {};
    let updatedJobSchedule = await dbService.update(JobSchedule,query,updateBody, options);
    if (!updatedJobSchedule) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedJobSchedule.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addJobSchedule,
  bulkInsertJobSchedule,
  findAllJobSchedule,
  getJobSchedule,
  getJobScheduleCount,
  updateJobSchedule,
  bulkUpdateJobSchedule,
  partialUpdateJobSchedule,
  softDeleteJobSchedule,
  deleteJobSchedule,
  deleteManyJobSchedule,
  softDeleteManyJobSchedule,
};
