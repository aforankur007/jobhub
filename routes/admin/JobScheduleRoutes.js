/**
 * JobScheduleRoutes.js
 * @description :: CRUD API routes for JobSchedule
 */

const express = require('express');
const router = express.Router();
const JobScheduleController = require('../../controller/admin/JobScheduleController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/jobschedule/create').post(auth(PLATFORM.ADMIN),checkRolePermission,JobScheduleController.addJobSchedule);
router.route('/admin/jobschedule/list').post(auth(PLATFORM.ADMIN),checkRolePermission,JobScheduleController.findAllJobSchedule);
router.route('/admin/jobschedule/count').post(auth(PLATFORM.ADMIN),checkRolePermission,JobScheduleController.getJobScheduleCount);
router.route('/admin/jobschedule/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,JobScheduleController.getJobSchedule);
router.route('/admin/jobschedule/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,JobScheduleController.updateJobSchedule);    
router.route('/admin/jobschedule/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,JobScheduleController.partialUpdateJobSchedule);
router.route('/admin/jobschedule/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,JobScheduleController.softDeleteJobSchedule);
router.route('/admin/jobschedule/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,JobScheduleController.softDeleteManyJobSchedule);
router.route('/admin/jobschedule/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,JobScheduleController.bulkInsertJobSchedule);
router.route('/admin/jobschedule/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,JobScheduleController.bulkUpdateJobSchedule);
router.route('/admin/jobschedule/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,JobScheduleController.deleteJobSchedule);
router.route('/admin/jobschedule/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,JobScheduleController.deleteManyJobSchedule);

module.exports = router;
