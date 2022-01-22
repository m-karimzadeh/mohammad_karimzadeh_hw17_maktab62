const { redirect } = require('express/lib/response');
const mongoose = require('mongoose');
const Company = require('../models/company');
const Employee = require('../models/employee');

function createForm(req, res, next){
    return res.render('Employee/create');
}

function create(req, res, next) {
    if (!req.body.firstName || !req.body.lastName) {
        return res.status(406).json({ msg: 'Not Acceptable' });
    };

    Company.findOne({_id: req.params.id}, (err, result) => {
        if (err) {
            return res.status(500).json({ msg: "Somthing went wrong" })
        };

        
        if (!result) {
            return res.status(500).json({ msg: "company not found" })
        };
        
        const NEW_Employee = new Employee({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            national_code: req.body.national_code,
            sex: req.body.sex ?? 'مرد',
            manager: Boolean(req.body.manager),
            birthdate: req.body.birthdate ?? null,
            company: mongoose.Types.ObjectId(req.params.id)
        });

        NEW_Employee.save((err, savedInfo) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ msg: "Somthing went wrong" })
            };

            // res.json(savedInfo)
            res.redirect(`/company/view/${req.params.id}`);
        })
    })
}

function list(req, res, next) {
    Employee.find({}, (err, employee) => {
        if (err) {
            return res.status(500).json({ msg: "Somthing went wrong" })
        };

        return res.render('employee/list', {employee});
    })
}

function view(req, res, next) {
    Employee.findOne({_id: req.params.id}).populate('company').exec((err, result) => {
        if (err || !result) {
            return res.status(500).json({ msg: "Somthing went wrong" })
        };

        return res.render('employee/view', {result});
    })
}

function updateForm(req, res, next) {
    Employee.findOne({_id: req.params.id}, (err, result) => {
        if (err || !result) {
            return res.status(500).json({ msg: "Somthing went wrong" })
        };

        return res.render('employee/update', {result});
    })
}

function update(req, res, next) {
    if (!req.params.id) {
        return res.status(406).json({ msg: 'Not Acceptable' });
    }

    Employee.findById(req.params.id, function (err, doc) {
        if (err) {
            return res.status(500).json({ msg: "Somthing went wrong" })
        };

        doc.firstName= req.body.firstName;
        doc.lastName= req.body.lastName;
        doc.national_code= req.body.national_code;
        doc.sex= req.body.sex ?? 'مرد';
        doc.manager= Boolean(req.body.manager);
        doc.birthdate= req.body.birthdate ?? null;

        doc.save();

        return res.redirect('/employee/list');
        // return res.json(doc)
    });
}

function deleteRecord(req, res, next) {
    if (!req.params.id) {
        return res.status(406).json({ msg: 'Not Acceptable' });
    }

    Employee.findById(req.params.id).deleteOne(function (err, doc) {
        if (err) {
            return res.status(500).json({ msg: "Somthing went wrong" })
        };

        // return res.json("The information was deleted correctly")
        return res.redirect('/employee/list');
    });
}

module.exports = {
    createForm,
    create,
    list,
    view,
    updateForm,
    update,
    deleteRecord
}