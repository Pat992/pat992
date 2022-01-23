const getPlaystoreApps = require('./js/getPlayStoreInformation')
const updateReadme = require('./js/updateReadme')

const baseUrl = process.argv[2];
const dev = '2DEE'

const startUpdate = async () => {
    const apps = await getPlaystoreApps.getPlaystoreApps(baseUrl, dev);
    updateReadme.updateReadme(apps);
}

startUpdate();