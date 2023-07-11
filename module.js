let somiibo;
let counter = 0;

async function main(mod) {
  somiibo = mod;

  counter++;

  await somiibo.worker(function (counter) {
    if (!window.location.href.includes('/search/')) {
      document.querySelector('input[name="q"').value = `https://opensea.io/collection/hweebs`;
      document.querySelectorAll('input[type="submit"]')[2].click();
    }
  }, {
    arguments: [counter],
    url: 'https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/53072707301300110528791128517643333770372762089746594648374035080322427750048',
    // proxy: '',
    // userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
    width: 600,
    height: 800,
    referrer: 'https://google.com',
    timeout: 60000,
    debug: false,
  })
  .then((worker) => {
    somiibo.log('Set up worker', worker);
  })
  .catch((e) => {
    somiibo.log('Failed to set up worker', e);
  });

  // After we've made 3 workers we can stop the module
  if (counter >= 100000) {
    return somiibo.stop();
  }

  // Run the main loop
  return somiibo.loop(main);
}

module.exports = main;
