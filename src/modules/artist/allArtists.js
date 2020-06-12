const { cheerioInit } = require("../html");

/**
 * All artists module
 * @module artist/allArtists
 */

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

      $(".mt-item-box-artist2").each((i, elem) => {
        const ARTIST = {
          id: getArtistId(getArtistLink($(elem))),
          name: getArtistName($(elem)),
          link: getArtistLink($(elem)),
          thumb: getArtistThumb($(elem)),
        };

        artists.push(ARTIST);
      });

      return artists;
    }
  );
};

/**
 * Get artist url
 * @param {string} url - artist url
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
const getArtistName = ($) => $.find(".item-title").text();

/**
 * Get artist page link
 * @param {function} $ - Cheerio
 * @function
 * @returns {string}
 */
const getArtistLink = ($) => $.find("a").attr("href");

/**
 * Get artist thumb
 * @param {function} $ - Cheerio
 * @function
 * @returns {string}
 */
const getArtistThumb = ($) => $.find("img").attr("src");

module.exports = {
  getAllArtists,
  getArtistId,
  getArtistName,
  getArtistLink,
  getArtistThumb,
};
