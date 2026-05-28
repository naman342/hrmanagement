async function createEmployee(req, res) {

    const employee = {
        id: Date.now(),
        fullName: req.body.fullName,
        jobTitle: req.body.jobTitle,
        country: req.body.country,
        salary: req.body.salary
    };

    res.status(201).json(employee);
}

module.exports = {
    createEmployee
};