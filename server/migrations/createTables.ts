import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import * as util from 'util';

const asyncExec = util.promisify(exec);

console.log(`
  ---------------------------------------
    +++ScratchNow DB Migration Start+++
  ---------------------------------------
`);

const migrationAllTable = async () => {
  const migrationFiles: string[] = [];

  fs.readdir(path.join(__dirname, '/', 'tables'), async (err, files) => {
    if (err) console.log('err: ', err);
    if (files) {
      files.forEach((el) => {
        migrationFiles.push(el);
      });

      for (const el of migrationFiles) {
        console.log('Migration File Name: ', el);

        const { stdout, stderr } = await asyncExec(
          `./node_modules/.bin/ts-node "${__dirname}/tables/${el}"`,
        );
        if (stdout) console.log(stdout);
        if (stderr) console.error('Std Err: ', stderr);
      }
    }
  });
};

migrationAllTable();
