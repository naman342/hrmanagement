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
   getCountryNames
};