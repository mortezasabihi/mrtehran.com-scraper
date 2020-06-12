const { cheerioInit } = require("../html");

/**
 * Music module
 * @module music/music
 */

/**
 * Get music url
 * @param {function} $ - Cheerio
 * @function
 * @returns {string}
 */
const getMusicUrl = ($) => $("link[rel='canonical']").attr("href");

/**
 * Get music title
 * @param {function} $ - Cheerio
 * @function
 * @returns {string}
 */
const getMusicTitle = ($) => $(".gp-titles-content h1").text();

/**
 * Get music artist
 * @param {function} $ - Cheerio
 * @function
 * @returns {string}
 */
const getMusicArtist = ($) => $(".gp-tags-content a").text();

/**
 * Get music download link
 * @param {function} $ - Cheerio
 * @function
 * @returns {array}
 */
const getMusicDownloadLink = ($) => {
  const FILES = [];

  $("#mt-modal-download .col-4").each((i, elem) => {
    const FILE = $(elem).find("a").attr("href");
    let QUALITY = FILE.split("/")[4].split("_")[1];
    QUALITY = typeof QUALITY === "undefined" ? "320" : QUALITY.toString();

    FILES.push({ url: FILE, quality: QUALITY });
  });

  return FILES;
};

/**
 * Get music cover
 * @param {function} $ - Cheerio
 * @function
 * @returns {string}
 */
const getMusicCover = ($) => $(".gp-artwork-content img").attr("src");

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
      files: getMusicDownloadLink($),
      cover: getMusicCover($),
      url: getMusicUrl($),
    };
  });
};

module.exports = {
  getMusicUrl,
  getMusicTitle,
  getMusicArtist,
  getMusicDownloadLink,
  getMusicCover,
  getMusic,
};
