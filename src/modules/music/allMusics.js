const { cheerioInit } = require("../html");

/**
 * All musics module
 * @module music/allMusics
 */

/**
 * Get music url
 * @param {function} $ - Cheerio
 * @function
 * @returns {string}
 */
const getMusicUrl = ($) => $.find("a[class=text-truncate]").last().attr("href");

/**
 * Get music file url
 * @param {function} $ - Cheerio
 * @function
 * @returns {string}
 */
const getMusicFileUrl = ($) => $.find(".mt-item-track").attr("data-song");

/**
 * Get music title
 * @param {function} $ - Cheerio
 * @function
 * @returns {string}
 */
const getMusicTitle = ($) => $.find("a[class=text-truncate]").text();

/**
 * Get music artist
 * @param {function} $ - Cheerio
 * @function
 * @returns {string}
 */
const getMusicArtist = ($) => $.find("small").text();

/**
 * Get all musics
 * @param {number} [page] - page (optional)
 * @function
 * @returns {array}
 */

/**
 * Get music cover
 * @param {function} $ - Cheerio
 * @function
 * @returns {string}
 */
const getMusicCover = ($) => $.find("img").attr("src");

/**
 * Get all musics
 * @param {number} [page] - page (optional)
 * @function
 * @returns {array}
 */
const getAllMusics = (page = 1) => {
  return cheerioInit(`https://mrtehran.com/browse/featured/page-${page}`).then(
    ($) => {
      let musics = [];

      $(".browse-tracks-section .col").each((i, elem) => {
        const MUSIC = {
          title: getMusicTitle($(elem)),
          artist: getMusicArtist($(elem)),
          url: getMusicUrl($(elem)),
          file: getMusicFileUrl($(elem)),
          cover: getMusicCover($(elem)),
        };

        musics.push(MUSIC);
      });

      return musics;
    }
  );
};

module.exports = getAllMusics;
