// Save this as cucumber-temp.js for testing
const common = [
  '--require-module ts-node/register',
  '--require src/support/hooks.ts',
  '--require src/step-definitions/**/*.ts',
  '--format progress',
  'features/**/*.feature'
].join(' ');

module.exports = {
  default: common
};