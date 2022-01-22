const { redirect } = require('express/lib/response');
const mongoose = require('mongoose');
const Company = require('../models/company');
const Employee = require('../models/employee');

function createForm(req, res, next){
    return res.render('company/create');
}

function create(req, res, next) {
    if (!req.body.name || !req.body.city || !req.body.state || !req.body.phone) {
        return res.status(406).json({ msg: 'Not Acceptable' });
    };

    const NEW_Company = new Company({
        name: req.body.name,
        registration_number: req.body.registration_number ?? null,
        city: req.body.city,
        state: req.body.state,
        registration_date: req.body.registration_date ?? null,
        phone: req.body.phone
    });

    NEW_Company.save((err, savedInfo) => {
        if (err) {
            return res.status(500).json({ msg: "Somthing went wrong" })
        };

        // res.json(savedInfo)
        res.redirect('/company/list');
    })
}

function list(req, res, next) {
    Company.find({}, (err, result) => {
        if (err) {
            return res.status(500).json({ msg: "Somthing went wrong" })
        };

        return res.render('company/list', {result});
    })
}

function view(req, res, next) {
    Company.findOne({_id: req.params.id}, (err, companyInfo) => {
        if (err || !companyInfo) {
            return res.status(500).json({ msg: "Somthing went wrong 1" })
        };

        Employee.find({ company: mongoose.Types.ObjectId(req.params.id) }, (err, employee) => {
            if (err) {
                return res.status(500).json({ msg: "Somthing went wrong 2" })
            };

            return res.render('company/view', {companyInfo, employee});
        })
    })
}

function updateForm(req, res, next) {
    Company.findOne({_id: req.params.id}, (err, result) => {
        if (err) {
            return res.status(500).json({ msg: "Somthing went wrong" })
        };

        return res.render('company/update', {result});
    })
}

function update(req, res, next) {
    if (!req.params.id) {
        return res.status(406).json({ msg: 'Not Acceptable' });
    }

    Company.findById(req.params.id, function (err, doc) {
        if (err) {
            return res.status(500).json({ msg: "Somthing went wrong" })
        };

        doc.name = req.body.name;
        doc.registration_number = req.body.registration_number ?? null;
        doc.city = req.body.city;
        doc.state = req.body.state;
        doc.registration_date = req.body.registration_date ?? null;
        doc.phone = req.body.phone;

        doc.save();

        return res.redirect('/company/list');
        // return res.json(doc)
    });
}

function deleteRecord(req, res, next) {
    if (!req.params.id) {
        return res.status(406).json({ msg: 'Not Acceptable' });
    }

    Company.findById(req.params.id).deleteOne(function (err, doc) {
        if (err) {
            return res.status(500).json({ msg: "Somthing went wrong" })
        };

        // return res.json("The information was deleted correctly")
        return res.redirect('/company/list');
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