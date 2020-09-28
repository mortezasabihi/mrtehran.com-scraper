const { getAllArtists } = require("../modules/artist/allArtists");
const {
  getArtist,
  getArtistMusics,
  getArtistAlbums,
} = require("../modules/artist/artist");
const response = require("../helper/response");

module.exports = {
  /**
   * Get all artists
   * @function
   * @async
   * @param {*} req
   * @param {*} res
   * @returns {object}
   */
  async all(req, res) {
    try {
      const PAGE = req.query.page || 1;
      const RESULT = await getAllArtists(PAGE);
      response(res, 200, RESULT);
    } catch (error) {
      console.log(error);
      response(res, 400, error);
    }
  },
  /**
   * Get single artist
   * @function
   * @async
   * @param {*} req
   * @param {*} res
   * @returns {object}
   */
  async get(req, res) {
    try {
      const RESULT = await getArtist(req.params.id);
      response(res, 200, RESULT);
    } catch (error) {
      response(res, 400, error);
      console.log(error);
    }
  },
  /**
   * Get artist musics
   * @function
   * @async
   * @param {*} req
   * @param {*} res
   * @returns {object}
   */
  async getMusics(req, res) {
    try {
      const RESULT = await getArtistMusics(req.params.id);
      response(res, 200, RESULT);
    } catch (error) {
      response(res, 400, error);
    }
  },
  /**
   * Get artist albums
   * @function
   * @async
   * @param {*} req
   * @param {*} res
   * @returns {object}
   */
  async getAlbums(req, res) {
    try {
      const RESULT = await getArtistAlbums(req.params.id);
      response(res, 200, RESULT);
    } catch (error) {
      response(res, 400, error);
    }
  },
};
