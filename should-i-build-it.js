const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const lastBuildJsonfileName = 'last-build-hash.json';
const buildItFileName = 'build-it.txt';
const args = process.argv.slice(2);
const lastBuildFiles = fs.existsSync(path.join('t2ClientBuildHashes', args[0] + '_' + lastBuildJsonfileName)) ?
  JSON.parse(fs.readFileSync(path.join('t2ClientBuildHashes', args[0] + '_' + lastBuildJsonfileName), 'utf8')) : {};
const filesToSkip = [lastBuildJsonfileName, buildItFileName, 'package-lock.json', 'new_last-build-hash.json'];
const dirsToSkip = ['.git', 'node_modules', 'dist', '.sencha'];
const newBuildFiles = {};

const getFileAndHashFormDir = dir => {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (!dirsToSkip.some(dir => path.dirname(fullPath).indexOf(dir) >= 0) && !filesToSkip.includes(file)) {
      if (fs.lstatSync(fullPath).isDirectory()) {
        getFileAndHashFormDir(fullPath);
      } else {
        newBuildFiles[fullPath] = getFileHash(fullPath);
      }
    }
  });
};

const getFileHash = fullPath => {
  const data = fs.readFileSync(fullPath);
  return checksum(data, 'sha1');
};

const checksum = (str, algorithm, encoding) => {
  return crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex');
};

const writeFile = (fileName, data) => {
  fs.writeFileSync('./' + fileName, data);
};

const areDifferent = (lastBuildFiles, newBuildFiles) => {
  let different = Object.keys(lastBuildFiles).length !== Object.keys(newBuildFiles).length;
  Object.keys(newBuildFiles).forEach(key => {
    if (!different) {
      different = !lastBuildFiles[key] ? true : lastBuildFiles[key] !== newBuildFiles[key];
    }
  });
  return different;
};

const removeIfExist = (fileName) => {
  if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
  }
}

// main  
removeIfExist(buildItFileName);
if (fs.lstatSync(process.cwd(), args[0]).isDirectory()) {
  getFileAndHashFormDir('./' + args[0]);
  console.log('\x1b[32m%s\x1b[0m', '--------------------------');
  if (areDifferent(lastBuildFiles, newBuildFiles)) {
    removeIfExist(path.join('t2ClientBuildHashes', args[0] + lastBuildJsonfileName));
    writeFile(path.join('t2ClientBuildHashes', args[0] + '_new_' + lastBuildJsonfileName), JSON.stringify(newBuildFiles));
    writeFile(buildItFileName, '');
    console.log('\x1b[32m%s\x1b[0m', 'Building ' + args[0]);
  } else {
    console.log('\x1b[32m%s\x1b[0m', 'Skipping ' + args[0]);
  }
  console.log('\x1b[32m%s\x1b[0m', '--------------------------');
}
