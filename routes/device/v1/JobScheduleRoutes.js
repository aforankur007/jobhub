/**
 * JobScheduleRoutes.js
 * @description :: CRUD API routes for JobSchedule
 */

const express = require('express');
const router = express.Router();
const JobScheduleController = require('../../../controller/device/v1/JobScheduleController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/jobschedule/create').post(auth(PLATFORM.DEVICE),checkRolePermission,JobScheduleController.addJobSchedule);
router.route('/device/api/v1/jobschedule/list').post(auth(PLATFORM.DEVICE),checkRolePermission,JobScheduleController.findAllJobSchedule);
router.route('/device/api/v1/jobschedule/count').post(auth(PLATFORM.DEVICE),checkRolePermission,JobScheduleController.getJobScheduleCount);
router.route('/device/api/v1/jobschedule/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,JobScheduleController.getJobSchedule);
router.route('/device/api/v1/jobschedule/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,JobScheduleController.updateJobSchedule);    
router.route('/device/api/v1/jobschedule/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,JobScheduleController.partialUpdateJobSchedule);
router.route('/device/api/v1/jobschedule/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,JobScheduleController.softDeleteJobSchedule);
router.route('/device/api/v1/jobschedule/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,JobScheduleController.softDeleteManyJobSchedule);
router.route('/device/api/v1/jobschedule/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,JobScheduleController.bulkInsertJobSchedule);
router.route('/device/api/v1/jobschedule/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,JobScheduleController.bulkUpdateJobSchedule);
router.route('/device/api/v1/jobschedule/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,JobScheduleController.deleteJobSchedule);
router.route('/device/api/v1/jobschedule/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,JobScheduleController.deleteManyJobSchedule);

module.exports = router;
