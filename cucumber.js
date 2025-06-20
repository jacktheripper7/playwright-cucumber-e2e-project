const common = [
  '--require-module ts-node/register',
  '--require src/support/hooks.ts',
  '--require src/step-definitions/**/*.ts',
  '--format @cucumber/pretty-formatter',
  'features/**/*.feature'
].join(' ');

module.exports = {
  default: common
};