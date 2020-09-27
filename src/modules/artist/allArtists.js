const { cheerioInit } = require("../html");

/**
 * All artists module
 * @module artist/allArtists
 */

/**
 * Get artist id
 * @param {string} url - artist id
 * @function
 * @returns {number}
 */
const getArtistId = (url) => url.split("/").pop();

/**
 * Get artist name
 * @param {function} $ - Cheerio
 * @function
 * @returns {string}
 */
const getArtistName = ($) => $.find("a.text-truncate").text();

/**
 * Get artist page url
 * @param {function} $ - Cheerio
 * @function
 * @returns {string}
 */
const getArtistUrl = ($) => $.find("a").attr("href");

/**
 * Get artist cover
 * @param {function} $ - Cheerio
 * @function
 * @returns {string}
 */
const getArtistCover = ($) => $.find("img").attr("src");

/**
 * Get all artists
 * @param {number} [page] - page (optional)
 * @function
 * @returns {array}
 */
const getAllArtists = (page = 1) => {
  return cheerioInit(`https://mrtehran.com/browse/artists/page-${page}`).then(
    ($) => {
      let artists = [];

      $(".row-cols-lg-3 .col").each((i, elem) => {
        const ARTIST = {
          id: getArtistId(getArtistUrl($(elem))),
          name: getArtistName($(elem)),
          url: getArtistUrl($(elem)),
          cover: getArtistCover($(elem)),
        };

        artists.push(ARTIST);
      });

      return artists;
    }
  );
};

module.exports = {
  getAllArtists,
  getArtistId,
  getArtistName,
  getArtistUrl,
  getArtistCover,
};
