// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const baseConf = require('./protractor.conf');

const overrides = {
  capabilities: null,
  multiCapabilities: [{
    logName: 'Chrome headless',
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless', '--disable-gpu'],
    },
  }, {
    logName: 'Chrome headless (iPhone 6/7/8)',
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless', '--disable-gpu'],
      mobileEmulation: {
        deviceName: 'iPhone 6/7/8'
      },
    },
  }]
};

/**
 * @type { import("protractor").Config }
 */
exports.config = Object.assign(baseConf.config, overrides);
