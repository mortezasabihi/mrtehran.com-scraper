const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Html parser module
 * @module html
 */

/**
 * Get web page html
 * @param {string} url - Web page url
 * @function
 * @returns {string}
 */
const getHtml = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

/**
 * Init cheerio
 * @param {string} url - Web page url
 * @function
 * @returns {function}
 */
const cheerioInit = async (url) => cheerio.load(await getHtml(url));

module.exports = {
  getHtml,
  cheerioInit,
};
