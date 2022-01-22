const express = require('express');
const router = express.Router();

const companyController = require('../controllers/company')

router.get('/', function (req, res, next) {
    return res.send('company route');
})

// localhost:3000/company/create
// {
//     "name": "golrang",
//     "registration_number": 123406,
//     "city": "tehran",
//     "state": "tehran",
//     "registration_date": "2018-05-08",
//     "phone": "09128102247"
// }
router.get('/create', companyController.createForm)
router.post('/create', companyController.create)

// localhost:3000/company/list
router.get('/list', companyController.list)

// localhost:3000/company/delete/61e0156d41791393c9280f30
router.get('/delete/:id', companyController.deleteRecord)

// localhost:3000/company/update/61e0156d41791393c9280f30
// {
//     "name": "golrang",
//     "registration_number": 123406,
//     "city": "tehran",
//     "state": "tehran",
//     "registration_date": "2018-05-08",
//     "phone": "09128102247"
// }
router.get('/update/:id', companyController.updateForm)
router.post('/update/:id', companyController.update)

// localhost:3000/company/view/61e81f671a51fccfd931517d
router.get('/view/:id', companyController.view)


module.exports = router;