module.exports = {
    ci: {
      collect: {
        startServerCommand: 'npm run serve',
        url: ['http://localhost:8081'],
      },
      upload: {
        /* Add configuration here */
        target: 'temporary-public-storage',
      },
    },
  };