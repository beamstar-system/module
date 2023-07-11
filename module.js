const fs = require('fs').promises;

let somiibo;
let counter = 0;

let proxies = new Set();
let userAgents = new Set();

fs.readFile('/proxy.txt', 'utf-8')
  .then(data => proxies = new Set(data.split('\n')))
  .catch(err => console.error(err));

fs.readFile('/ua.txt', 'utf-8')
  .then(data => userAgents = new Set(data.split('\n')))
  .catch(err => console.error(err));

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

async function main(mod) {
  somiibo = mod;

  for (counter = 0; counter < 100000; counter++) {
    let proxy = getRandomElement(Array.from(proxies));
    let userAgent = getRandomElement(Array.from(userAgents));

    try {
      await somiibo.worker(async function (counter) {
        try {
          if (!window.location.href.includes('/search/')) {
            document.querySelector('input[name="q"').value = `site:https://hweeb.medium.com/learn-what-an-nft-is-exploring-hweeb-eths-take-5260f8f0b42f`;
            document.querySelectorAll('input[type="submit"]')[2].click();
          } else {
            let scrollTimes = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
            for(let i = 0; i < scrollTimes; i++) {
              await somiibo.browser().scroll({x: 0, y: document.body.scrollHeight}, {offsetX: 0, offsetY: -50});
            }

            let waitTime = Math.random() * (20 - 5) + 5; // Random number between 5 and 20
            await new Promise(resolve => setTimeout(resolve, waitTime * 60 * 1000));
          }
        } catch (e) {
          somiibo.log('Error in worker function', e);
        }
      }, {
        arguments: [counter],
        url: 'https://hweeb.medium.com/learn-what-an-nft-is-exploring-hweeb-eths-take-5260f8f0b42f',
        width: 600,
        height: 800,
        referrer: 'https://hweeb.medium.com/learn-what-an-nft-is-exploring-hweeb-eths-take-5260f8f0b42f',
        timeout: 60000,
        debug: false,
        proxy: proxy,
        userAgent: userAgent,
      })
      .then((worker) => {
        somiibo.log(`Set up worker ${counter}`, worker);
      })
      .catch((e) => {
        somiibo.log(`Failed to set up worker ${counter}`, e);
      });
    } catch (e) {
      somiibo.log(`Failed to set up worker ${counter}`, e);
    }
  }

  return somiibo.stop();
}

module.exports = main;