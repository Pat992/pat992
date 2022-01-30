const axios = require('axios');
const dateTime = require('date-and-time')

module.exports.getPlaystoreApps = async (baseUrl, developer) => {
    let appIds = await getAppsFromDev(baseUrl, developer);
    let appDetails = await getAppInformations(baseUrl, appIds);

    return appDetails;
}

// Get app-ids
const getAppsFromDev = async (baseUrl, developer) => {
    const url = `${baseUrl}/developers/${developer}`;
    let apps = [];
    let res = await axios.get(url);

    res.data.apps.forEach(app => {
        apps.push(app.appId);
    });

    return apps;
}

// Get app-informations
const getAppInformations = async (baseUrl, apps) => {
    appDetails = [];

    for (const app of apps) {
        const url = `${baseUrl}/apps/${app}`
        let res = await axios.get(url);
        const date = new Date(res.data.updated);
        const dateStr = dateTime.format(date, 'MMM DD, YYYY');
        appDetails.push({
            appID: app,
            appName: res.data.title,
            icon: res.data.icon,
            url: res.data.playstoreUrl,
            summary: res.data.summary,
            installs: res.data.maxInstalls,
            released: res.data.released,
            updated: dateStr
        });
    }

    return appDetails;
}