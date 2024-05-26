const { mockAPIService } = require('../services');

const getMockData = (req, res) => {
    const data = mockAPIService.getMockData();
    res.status(200).json(data);
};

const createMockData = async (req, res) => {
    const body = await req.json();
    const newData = mockAPIService.createMockData(body);
    res.status(200).json({ message: 'Data created successfully', data: newData }); // Send response in JSON format
};

module.exports = {
    getMockData,
    createMockData,
};
