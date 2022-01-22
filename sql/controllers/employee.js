const Company = require('../database/models/company');
const Employee = require('../database/models/employee');

function createForm(req, res, next) {
    return res.render('Employee/create');
}

async function create(req, res, next) {
    if (!req.body.firstName || !req.body.lastName) {
        return res.status(406).json({ msg: 'Not Acceptable' });
    };

    try {
        const companyInfo = await Company.findByPk(req.params.id);
        if (companyInfo === null) {
            return res.status(500).json({ msg: "company not found" })
        };

        const saveInfo = await Employee.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            national_code: req.body.national_code,
            sex: req.body.sex ?? 'مرد',
            manager: Boolean(req.body.manager),
            birthdate: req.body.birthdate ?? null,
            companyId: req.params.id
        });

        // res.json(savedInfo)
        res.redirect(`/company/view/${req.params.id}`);

    } catch (err) {
        return res.status(500).json({ msg: "Somthing went wrong" })
    }
}

async function list(req, res, next) {
    try {
        const employee = await Employee.findAll();
        return res.render('employee/list', { employee });

    } catch (err) {
        return res.status(500).json({ msg: "Somthing went wrong" })
    }
}

async function view(req, res, next) {
    try {
        const result = await Employee.findOne({
            where: {
                id: req.params.id
            },
            include: 'company'
        });
        if (result === null) {
            return res.status(500).json({ msg: "Somthing went wrong" })
        };

        return res.render('employee/view', { result });

    } catch (err) {
        return res.status(500).json({ msg: "Somthing went wrong" })
    }
}

async function updateForm(req, res, next) {
    try {
        const result = await Employee.findByPk(req.params.id);
        if (result === null) {
            return res.status(500).json({ msg: "Somthing went wrong" })
        }
        return res.render('employee/update', { result });

    } catch (err) {
        return res.status(500).json({ msg: "Somthing went wrong" })
    }
}

async function update(req, res, next) {
    if (!req.params.id) {
        return res.status(406).json({ msg: 'Not Acceptable' });
    }

    try {
        const employeeInfo = await Employee.findByPk(req.params.id);
        if (employeeInfo === null) {
            return res.status(406).json({ msg: 'Not Acceptable' });
        }

        await employeeInfo.update({

            firstName: req.body.firstName,
            lastName: req.body.lastName,
            national_code: req.body.national_code,
            sex: req.body.sex ?? 'مرد',
            manager: Boolean(req.body.manager),
            birthdate: req.body.birthdate ?? null
        })

        await employeeInfo.save();

        return res.redirect('/employee/list');
        // return res.json(employeeInfo)

    } catch (err) {
        return res.status(500).json({ msg: "Somthing went wrong" })
    }
}

async function deleteRecord(req, res, next) {
    if (!req.params.id) {
        return res.status(406).json({ msg: 'Not Acceptable' });
    }

    try {
        const employeeInfo = await Employee.findByPk(req.params.id);
        employeeInfo.destroy();

        // return res.json("The information was deleted correctly")
        return res.redirect('/employee/list');

    }catch(err){
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