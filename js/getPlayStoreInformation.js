const axios = require('axios');
const jsdom = require("jsdom");

const playstoreBaseUrl = 'https://play.google.com';
const playstoreUrl = '/store/apps/developer?id=2DEE';

const getDevPage = async () => {
    const filteredLinks = [];

    try {
        let res = await axios.get(`${playstoreBaseUrl}${playstoreUrl}`);

        const doc = new jsdom.JSDOM(res.data);
        const links = doc.window.document.querySelectorAll('a');

        links.forEach(item => {
            if (item.getAttribute('jslog') !== null && item.getAttribute('jslog').includes('track:click,impression')) {
                filteredLinks.push(`${playstoreBaseUrl}${item.getAttribute('href')}`);
            }
        });

        return filteredLinks;
    } catch (e) {
        console.log(e);
        return filteredLinks;
    }

};

const getAppPage = async (url) => {
    let returnObj = {
        title: '',
        imageUrl: '',
        description: '',
        downloadCounter: '',
        appUrl: url,
        latUpdated: '',
        error: ''
    };

    try {
        let res = await axios.get(url);

        const doc = new jsdom.JSDOM(res.data);
        const headers1 = doc.window.document.querySelectorAll('h1');
        const images = doc.window.document.querySelectorAll('img');
        const divs = doc.window.document.querySelectorAll('div');

        headers1.forEach(item => {
            if (item.getAttribute('itemprop') !== null && item.getAttribute('itemprop').includes('name')) {
                const titleSpan = item.innerHTML.replace('<span>', '').replace('</span>', '');

                returnObj.title = titleSpan;
            }
        });

        images.forEach(item => {
            if (item.getAttribute('alt') !== null && item.getAttribute('alt').includes('Icon image') &&
                item.getAttribute('src') !== null && item.getAttribute('src').includes('w240-h480')) {

                returnObj.imageUrl = item.getAttribute('src');
            }
        });

        divs.forEach(item => {
            if (item.getAttribute('data-g-id') !== null
                && item.getAttribute('data-g-id').includes('description')
                && item.getElementsByTagName('b')[0] !== undefined
            ) {
                returnObj.description = item.getElementsByTagName('b')[0].innerHTML.replace(':', '');
            } else if (item.innerHTML !== undefined && item.innerHTML === 'Downloads') {
                returnObj.downloadCounter = item.previousSibling.innerHTML;
            } else if (item.innerHTML !== undefined && item.innerHTML === 'Updated on') {
                returnObj.latUpdated = item.nextSibling.innerHTML;
            }
        });

        return returnObj;
    } catch (e) {
        console.log(e);
        return returnObj;
    }
}

module.exports.getPlaystoreApps = async () => {
    let appList = [];
    let list = [];
    let error = '';
    try {
        while (list.length === 0) {
            list = await getDevPage();
        }

        for (let i in list) {
            appPageObj = await getAppPage(list[i]);
            appList.push(appPageObj);
        }

        return {
            apps: appList,
        };
    } catch (e) {
        return {};
    }
}