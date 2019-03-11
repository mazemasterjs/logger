import {expect} from 'chai';
import {Logger, LOG_LEVELS} from '../src/Logger';

let log: Logger;

// runs before all tests in this block
before(function() {
    log = Logger.getInstance();
    log.LogLevel = LOG_LEVELS.INFO;
    console.log('BEFORE');
});

// reset color before each test
beforeEach(function() {
    log.ColorDisabled = false;
});

// test cases
describe('Logger Tests', () => {
    it(`Logger.getInstance() should not return null`, () => {
        expect(log).not.to.be.null;
    });

    it(`log.packageInfo() should read package.json and return app name and version`, () => {
        let packageInfo = log.PackageInfo;
        log.info(__filename, 'Logger test', 'Application: ' + packageInfo.name + ', Version: ' + packageInfo.version);
        expect(packageInfo.name).to.equal('@mazemasterjs/logger');
        expect(packageInfo.version).not.to.be.empty;
    });

    it(`Info logging should work as expected`, () => {
        log.LogLevel = LOG_LEVELS.INFO;
        log.info(__filename, 'Logger test', 'Test message.');
        log.ColorDisabled = true;
        log.info(__filename, 'Logger test', 'Test message.');
        log.ColorDisabled = true;
        expect(log.LogLevel).to.equal(LOG_LEVELS.INFO);
    });

    it(`Debug logging should work as expected`, () => {
        log.LogLevel = LOG_LEVELS.DEBUG;
        log.debug(__filename, 'Logger test', 'Test message.');
        log.ColorDisabled = true;
        log.debug(__filename, 'Logger test', 'Test message.');
        expect(log.LogLevel).to.equal(LOG_LEVELS.DEBUG);
    });

    it(`Warn logging should work as expected`, () => {
        log.LogLevel = LOG_LEVELS.WARN;
        log.warn(__filename, 'Logger test', 'Test message.');
        log.ColorDisabled = true;
        log.warn(__filename, 'Logger test', 'Test message.');
        expect(log.LogLevel).to.equal(LOG_LEVELS.WARN);
    });

    it(`Error logging should work as expected`, () => {
        log.LogLevel = LOG_LEVELS.ERROR;
        log.error(__filename, 'Logger test', 'Test message -> ', new Error('Test Error'));
        log.ColorDisabled = true;
        log.error(__filename, 'Logger test', 'Test message -> ', new Error('Test Error'));
        expect(log.LogLevel).to.equal(LOG_LEVELS.ERROR);
    });

    it(`Trace logging should work as expected`, () => {
        log.LogLevel = LOG_LEVELS.TRACE;
        log.trace(__filename, 'Logger test', 'Test message.');
        log.error(__filename, 'Logger test', 'Test message -> ', new Error('Test Error'));
        log.ColorDisabled = true;
        log.trace(__filename, 'Logger test', 'Test message.');
        log.error(__filename, 'Logger test', 'Test message -> ', new Error('Test Error'));
        expect(log.LogLevel).to.equal(LOG_LEVELS.TRACE);
    });

    it(`Force logging should work as expected`, () => {
        log.force(__filename, 'Logger test', 'Test message.');
        log.ColorDisabled = true;
        log.force(__filename, 'Logger test', 'Test message.');
        expect(null);
    });

    it(`log.ColorsDisabled = true should set the colorsDisabled flag to true`, () => {
        log.ColorDisabled = true;
        expect(log.ColorDisabled).to.be.true;
    });
});
