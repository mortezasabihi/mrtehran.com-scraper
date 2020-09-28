const { JSDOM } = require("jsdom");
const { cheerioInit } = require("../html");
const { getMusic } = require("../music/music");

/**
 * Artist module
 * @module artist/artist
 */

/**
 * Get artist name
 * @param {function} $ - Cheerio
 * @function
 * @returns {string}
 */
const getArtistName = ($) => $("h2.mb-0").text();

/**
 * Get artist cover
 * @param {function} $ - Cheerio
 * @function
 * @returns {string}
 */
const getArtistCover = ($) => {
  const DOM = new JSDOM($(".w-100 .container-sm .rounded-lg").html());
  return DOM.window.document
    .querySelector("div")
    .style._values["background-image"].slice(4, -1);
};

/**
 * Get artist bio
 * @param {function} $ - Cheerio
 * @function
 * @returns {string}
 */
const getArtistBio = ($) => {
  const BIO = $("#biography .w-100").text();
  return BIO !== "Biography not found." ? BIO : null;
};

/**
 * Get artist
 * @param {number} id - artist id
 * @function
 * @returns {object}
 */
const getArtist = (id) => {
  return cheerioInit(`https://mrtehran.com/artist/${id}`).then(($) => {
    return {
      name: getArtistName($),
      cover: getArtistCover($),
      bio: getArtistBio($),
    };
  });
};

/**
 * Get artist musics
 * @param {number} id - artist id
 * @function
 * @returns {array}
 */
const getArtistMusics = (id) => {
  return cheerioInit(`https://mrtehran.com/artist/${id}`).then(($) => {
    const SECTION = $(".all-tracks-section .mt-item-track");

    return Promise.all(
      Array.from(SECTION, (elem) => getMusic($(elem).attr("data-url")))
    );
  });
};

/**
 * Get artist albums
 * @param {number} id - artist id
 * @function
 * @returns {array}
 */
const getArtistAlbums = (id) => {
  return cheerioInit(`https://mrtehran.com/artist/${id}`).then(($) => {
    const SECTION = $(".row-cols-lg-3").last();
    let albums = [];

    $(SECTION)
      .find(".col")
      .each((i, elem) => {
        const ALBUM = {
          title: $(elem).find("a.text-truncate").text(),
          url: $(elem).find("a.text-truncate").attr("href"),
          cover: $(elem).find("img").attr("src"),
        };

        albums.push(ALBUM);
      });

    return albums;
  });
};

module.exports = {
  getArtist,
  getArtistName,
  getArtistCover,
  getArtistMusics,
  getArtistAlbums,
};
