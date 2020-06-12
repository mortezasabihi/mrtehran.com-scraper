const getAllMusics = require("../modules/music/allMusics");
const { getMusic } = require("../modules/music/music");
const response = require("../helper/response");

module.exports = {
  /**
   * Get all musics
   * @function
   * @async
   * @param {*} req
   * @param {*} res
   * @returns {object}
   */
  async getAll(req, res) {
    try {
      const PAGE = req.query.page || 1;
      const RESULT = await getAllMusics(PAGE);
      response(res, 200, RESULT);
    } catch (error) {
      response(res, 400, error);
    }
  },
  /**
   * Get single musics
   * @function
   * @async
   * @param {*} req
   * @param {*} res
   * @returns {object}
   */
  async get(req, res) {
    try {
      const RESULT = await getMusic(req.query.url);
      response(res, 200, RESULT);
    } catch (error) {
      response(res, 400, error);
    }
  },
};
