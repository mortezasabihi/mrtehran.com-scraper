const { cheerioInit } = require("../html");
const { getMusic } = require("../music/music");

/**
 * All musics module
 * @module music/allMusics
 */

/**
 * Get all musics
 * @param {number} [page] - page (optional)
 * @function
 * @returns {array}
 */

const getAllMusics = (page = 1) => {
  return cheerioInit(`https://mrtehran.com/browse/featured/page-${page}`).then(
    ($) => {
      let promises = [];

      $(".musicbox-related .col-sm-4").each((i, elem) =>
        promises.push(getMusic($($(elem)).attr("mtp-data-url")))
      );

      return Promise.all(promises);
    }
  );
};

module.exports = getAllMusics;
