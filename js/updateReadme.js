const fs = require("fs");

module.exports.updateReadme = (apps) => {
    console.log(apps);
    if (apps.apps.length > 0) {
        let readme = fs.readFileSync('templateReadme.md', { encoding: 'utf8', flag: 'r' });

        appsTable = '|App|Summary|Total installs|Last updated\n|:---|:---|:---|:---|\n'

        apps.apps.forEach(app => {
            appsTable += `[<img src="${app.imageUrl}" width="70" height="70" style="border-radius:10%;box-shadow:2px 2px 5px grey;">](${app.appUrl})</br>${app.title}|${app.description}|${app.downloadCounter}|${app.latUpdated}\n`
        });
        readme = readme.replace('[APPS]', appsTable);

        fs.writeFileSync('README.md', readme);
    }

}