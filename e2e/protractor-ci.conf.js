// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const baseConf = require('./protractor.conf');

const overrides = {
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless', '--disable-gpu'],
    },
  },
};

/**
 * @type { import("protractor").Config }
 */
exports.config = Object.assign(baseConf.config, overrides);
