module.exports = {
    PORT: process.env.port || 8080,
    GITHUB_KEY: (process.env.API_ENDPOINT) ? '0c82753fb997b667da51' : 'c74908c7643a8e010d50',
    GITHUB_SECRET: (process.env.API_ENDPOINT) ? 'eda3630a38cd9b9c19b0cb97c436d6f122a2bc8e' : 'd6c1b1c3d77f8eff8adc4541e862207b551bb2eb'
};
