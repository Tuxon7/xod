import path from 'path';
import { assert } from 'chai';
import { composeCommand } from '../src/builder';
import { isWindows } from '../src/utils';

const winExt = isWindows ? '.exe' : '';

describe('Builder', () => {
  it('composeCommand() returns correct command', () => {
    const sketch = path.normalize('/tmp/test.cpp');
    const packagesDir = path.normalize('/xod/packages/');
    const libraryDirs = [
      path.normalize('/xod/libraries/'),
      path.normalize('/xod/my-libs'),
    ];
    const artifacts = path.normalize('/xod/artifacts/');
    const builderDir = path.normalize('/xod/arduino-builder/');

    const cmd = composeCommand(
      sketch,
      'arduino:avr:uno',
      packagesDir,
      libraryDirs,
      artifacts,
      builderDir
    );

    const execCmd = path.normalize(
      `/xod/arduino-builder/arduino-builder${winExt}`
    );
    const hardwareA = path.normalize('/xod/arduino-builder/hardware');
    const toolsA = path.normalize('/xod/arduino-builder/tools');

    assert.strictEqual(
      cmd,
      [
        `"${execCmd}"`,
        `-hardware="${hardwareA}"`,
        `-hardware="${packagesDir}"`,
        `-libraries="${libraryDirs[0]}"`,
        `-libraries="${libraryDirs[1]}"`,
        `-tools="${toolsA}"`,
        `-tools="${packagesDir}"`,
        '-fqbn="arduino:avr:uno"',
        `-build-path="${artifacts}"`,
        `"${sketch}"`,
      ].join(' ')
    );
  });
});
