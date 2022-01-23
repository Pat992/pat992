const fs = require("fs");

module.exports.updateReadme = (apps) => {
    let readme = fs.readFileSync('templateReadme.md', { encoding: 'utf8', flag: 'r' });

    appsTableItems = '|App|Installs|Released|\n|:---|:---|:---|\n'

    apps.forEach(app => {
        appsTableItems += `[<img src="${app.icon}" width="50" height="50" style="border-radius:10%;box-shadow:2px 2px 5px grey;">](${app.url})</br>${app.appName}|${app.maxInstalls}|${app.released}\n`
    });
    readme = readme.replace('[APPS]', apps[0].appName);

    fs.writeFileSync('README.md', readme);
}