const Companies = require("./models/company");
const Employees = require("./models/employee");

(async function () {
    try {
        await Companies.sync({ alter: true });
        await Employees.sync({ alter: true });

    }catch(err){
        console.log("unable to connect to sync  tables: ", err)
        process.exit(1);
    }
})()