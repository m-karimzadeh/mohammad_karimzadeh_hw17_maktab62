const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee')

router.get('/', function (req, res, next) {
    return res.send('employee route');
})

// localhost:3000/employee/create
// {
//     "name": "golrang",
//     "registration_number": 123406,
//     "city": "tehran",
//     "state": "tehran",
//     "registration_date": "2018-05-08",
//     "phone": "09128102247"
// }
router.get('/create/:id', employeeController.createForm)
router.post('/create/:id', employeeController.create)

// localhost:3000/employee/list
router.get('/list', employeeController.list)

// localhost:3000/employee/delete/61e0156d41791393c9280f30
router.get('/delete/:id', employeeController.deleteRecord)

// localhost:3000/employee/update/61e0156d41791393c9280f30
// {
//     "name": "golrang",
//     "registration_number": 123406,
//     "city": "tehran",
//     "state": "tehran",
//     "registration_date": "2018-05-08",
//     "phone": "09128102247"
// }
router.get('/update/:id', employeeController.updateForm)
router.post('/update/:id', employeeController.update)

// localhost:3000/employee/view/61e81f671a51fccfd931517d
router.get('/view/:id', employeeController.view)


module.exports = router;