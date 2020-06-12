const { JSDOM } = require("jsdom");
const { cheerioInit } = require("../html");
const { getMusic } = require("../music/music");

/**
 * Artist module
 * @module artist/artist
 */

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
      social: getSocialMediaLinks($),
      cover: getArtistCover($),
    };
  });
};

/**
 * Get artist name
 * @param {function} $ - Cheerio
 * @function
 * @returns {string}
 */
const getArtistName = ($) => $(".title-container h1").text();

/**
 * Get artist social media links
 * @param {function} $ - Cheerio
 * @function
 * @returns {array}
 */
const getSocialMediaLinks = ($) => {
  let socialLinks = [];

  $("a.follow-button").each((i, elem) => {
    const LINK = {
      title: $(elem).text().toLowerCase(),
      url: $(elem).attr("href"),
    };

    socialLinks.push(LINK);
  });

  return socialLinks;
};

/**
 * Get artist cover
 * @param {function} $ - Cheerio
 * @function
 * @returns {string}
 */
const getArtistCover = ($) => {
  const HTML = new JSDOM($.html(".wall-bg-container"));
  const STRING = Object.values(
    HTML.window.document.querySelector(".wall-bg-container").style._values
  ).toString();
  return STRING.substring(4).slice(0, -1);
};

/**
 * Get artist musics
 * @param {number} id - artist id
 * @function
 * @returns {array}
 */
const getArtistMusics = (id) => {
  return cheerioInit(`https://mrtehran.com/artist/${id}`).then(($) => {
    const SECTION = $(".musicbox-tracks .musicbox-item");

    return Promise.all(
      Array.from(SECTION, (elem) => getMusic($(elem).attr("mtp-data-url")))
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
    const SECTION = $(".row.px-2").last();
    let albums = [];

    $(SECTION)
      .find(".col-sm-4")
      .each((i, elem) => {
        const ALBUM = {
          title: $(elem).find(".item-title").text(),
          url: $(elem).find("a").attr("href"),
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
  getSocialMediaLinks,
  getArtistCover,
  getArtistMusics,
  getArtistAlbums,
};
