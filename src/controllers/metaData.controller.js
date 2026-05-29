const {
    jobTitleSchema
} = require('../validators/metaData.validator');

const {
    createJobTilleService
} = require('../services/metaData.service');

async function getjobTitles(req, res) {

    const result = [
        {
            "title": "Software developer",
            "code": "SDE",
            "id": 1,
        },
        {
            "title": "Senior Software developer",
            "code": "SDE2",
            "id": 1,
        },
        {
            "title": "Product Manager",
            "code": "PM1",
            "id": 3,
        },
          {
            "title": "Senior Product Manager",
            "code": "PM2",
            "id": 4,
        }

    ]
 return res.status(200).json(result);

}
async function createJobTitles(req, res) {
    const { error } =
            jobTitleSchema.validate(req.body);

        if (error) {
            let message =
                error.details[0].message;

            return res.status(400).json({
                message
            });

        }

    const employee = await createJobTilleService(req.body);
    res.status(201).json(employee);

}

async function getCountryNames(req, res) {

    const result = [
        {
            "title": "India",
            "code": "INR",
            "id": 1,
        },
        {
            "title": "United States of America",
            "code": "USA",
            "id": 2,
        },
        {
            "title": "Germany",
            "code": "EUR",
            "id": 3,
        }
    ]
 return res.status(200).json(result);

}

module.exports = {
   getjobTitles,
   createJobTitles,
   getCountryNames
};