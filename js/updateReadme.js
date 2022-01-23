const fs = require("fs");

module.exports.updateReadme = (apps) => {
    let readme = fs.readFileSync('templateReadme.md', { encoding: 'utf8', flag: 'r' });

    readme = readme.replace('[APPS]', apps[0].appName);

    console.log(readme);

    fs.writeFileSync('README.md', readme);
}

