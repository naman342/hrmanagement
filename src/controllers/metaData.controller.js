const {
    jobTitleSchema,
    countryNameSchema
} = require('../validators/metaData.validator');

const {
    createJobTilleService,
    getJobTitlesService,
    createCountryNameService,
    getCountryNameService
} = require('../services/metaData.service');

async function getjobTitles(req, res) {

    const result = await getJobTitlesService()
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

    const result = await getCountryNameService()
    return res.status(200).json(result);

}

async function createCountryNames(req, res) {
    const { error } =
            countryNameSchema.validate(req.body);

        if (error) {
            let message =
                error.details[0].message;

            return res.status(400).json({
                message
            });

        }

    const countryName = await createCountryNameService(req.body);

    res.status(201).json(countryName);
}
    


module.exports = {
   getjobTitles,
   createJobTitles,
   getCountryNames,
   createCountryNames
};