const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const fileName = 'last-build-files.json';
const lastBuildFiles = JSON.parse(fs.readFileSync('./' + fileName, 'utf8'));

const filesToSkip = [fileName, '_build.txt', '_skip.txt'];
const dirsToSkip = ['.git', 'node_modules', 'dist'];
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
  fs.writeFileSync('./' + fileName, data, { encoding: 'utf8', flag: 'w' });
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

getFileAndHashFormDir('./');
if (areDifferent(lastBuildFiles, newBuildFiles)) {
  writeFile(fileName, JSON.stringify(newBuildFiles));
  writeFile('_build.txt', '');
} else {
  writeFile('_skip.txt', '');
}
