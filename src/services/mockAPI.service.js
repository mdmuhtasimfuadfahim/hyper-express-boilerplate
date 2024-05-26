const getMockData = () => {
    return {
        data: [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' },
        ],
    };
};

const createMockData = (data) => {
    return { id: Date.now(), ...data };
};

module.exports = {
    getMockData,
    createMockData,
};
