const { homedir } = require('os');
const { join } = require('path');
const { LOG_FILE_NAME } = require('./logger');

const GENERAL_ERR = () => `Something went wrong. You can check ${join(homedir(), LOG_FILE_NAME())} to debug and resolve.\n`;
const ACTION_FAIL = 'Error: Action failed.';

module.exports = { GENERAL_ERR, ACTION_FAIL };