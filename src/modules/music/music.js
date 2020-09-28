const { cheerioInit } = require("../html");

/**
 * Music module
 * @module music/music
 */

/**
 * Get music title
 * @param {function} $ - Cheerio
 * @function
 * @returns {string}
 */
const getMusicTitle = ($) => $("h3").text();

/**
 * Get music artist
 * @param {function} $ - Cheerio
 * @function
 * @returns {string}
 */
const getMusicArtist = ($) => $(".mt-item-track-single").attr("data-artist");

/**
 * Get music download link
 * @param {function} $ - Cheerio
 * @function
 * @returns {array}
 */
const getMusicDownloadLink = ($) =>
  $(".mt-item-track-single").attr("data-song");

/**
 * Get music cover
 * @param {function} $ - Cheerio
 * @function
 * @returns {string}
 */
const getMusicCover = ($) => $(".bg-color-white-trans img").attr("src");

/**
 * Get music
 * @param {string} url - Music web page url
 * @function
 * @returns {object}
 */
const getMusic = (url) => {
  return cheerioInit(url).then(($) => {
    return {
      title: getMusicTitle($),
      artist: getMusicArtist($),
      file: getMusicDownloadLink($),
      cover: getMusicCover($),
    };
  });
};

module.exports = {
  getMusicTitle,
  getMusicArtist,
  getMusicDownloadLink,
  getMusicCover,
  getMusic,
};
