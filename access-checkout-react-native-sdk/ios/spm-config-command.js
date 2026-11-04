// Config command for react-native spm (setup-apple-spm) in THIS library package.
//
// The RN CLI reports `project.ios = null` for this directory because it has a
// root podspec and is therefore classified as a dependency/library, not an app.
// `generate-spm-autolinking-config` needs `project.ios.sourceDir`, so we run the
// real CLI config and splice in the unit-test host app's ios dir (this folder).
//
// Referenced via RCT_SPM_AUTOLINKING_CONFIG_COMMAND in ios/.xcode.env.local and
// for CLI generation. See setup-apple-spm docs / the "Missing package product"
// troubleshooting notes.
const { execSync } = require('child_process');
const path = require('path');

const iosDir = __dirname;
const projectRoot = path.dirname(iosDir);

const cfg = JSON.parse(
  execSync('npx react-native config', { cwd: projectRoot }).toString(),
);

cfg.project = cfg.project || {};
cfg.project.ios = { sourceDir: iosDir };

process.stdout.write(JSON.stringify(cfg));
