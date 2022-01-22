const Company = require('../database/models/company');
const Employee = require('../database/models/employee');

function createForm(req, res, next) {
    return res.render('company/create');
}

async function create(req, res, next) {
    if (!req.body.name || !req.body.city || !req.body.state || !req.body.phone) {
        return res.status(406).json({ msg: 'Not Acceptable' });
    };

    try {
        const saveInfo = await Company.create({
            name: req.body.name,
            registration_number: req.body.registration_number ?? null,
            city: req.body.city,
            state: req.body.state,
            registration_date: req.body.registration_date ?? null,
            phone: req.body.phone
        })

        // res.json(savedInfo)
        res.redirect('/company/list');

    } catch (err) {
        return res.status(500).json({ msg: "Somthing went wrong" })
    }
}

async function list(req, res, next) {
    try {
        const result = await Company.findAll();
        return res.render('company/list', { result });

    } catch (err) {
        return res.status(500).json({ msg: "Somthing went wrong" })
    }
}

async function view(req, res, next) {
    try {
        const companyInfo = await Company.findByPk(req.params.id);
        const employee = await Employee.findAll({
            where: {
                companyId: req.params.id
            }
        });

        return res.render('company/view', { companyInfo, employee });

    } catch (err) {
        return res.status(500).json({ msg: "Somthing went wrong" })
    }
}

async function updateForm(req, res, next) {
    try {
        const result = await Company.findByPk(req.params.id);

        return res.render('company/update', { result });

    } catch (err) {
        return res.status(500).json({ msg: "Somthing went wrong" })
    }
}

async function update(req, res, next) {
    if (!req.params.id) {
        return res.status(406).json({ msg: 'Not Acceptable' });
    }

    try {
        const companyInfo = await Company.findByPk(req.params.id);
        if (companyInfo !== null) {
            await companyInfo.update({
                name: req.body.name,
                registration_number: req.body.registration_number ?? null,
                city: req.body.city,
                state: req.body.state,
                registration_date: req.body.registration_date ?? null,
                phone: req.body.phone
            })

            await companyInfo.save()
        }

        return res.redirect('/company/list');
        // return res.json(companyInfo)

    } catch (err) {
        return res.status(500).json({ msg: "Somthing went wrong" })
    }
}

async function deleteRecord(req, res, next) {
    try {
        const companyInfo = await Company.findByPk(req.params.id);
        await companyInfo.destroy();

        // return res.json("The information was deleted correctly")
        return res.redirect('/company/list');

    } catch (err) {
        return res.status(500).json({ msg: "Somthing went wrong" })
    }
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