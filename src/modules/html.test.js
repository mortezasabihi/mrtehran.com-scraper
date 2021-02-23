const axios = require("axios");
const cheerio = require("cheerio");
const { getHtml, cheerioInit } = require("./html");

describe("html", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getHtml", () => {
    it("should get html", async () => {
      const getSpy = jest
        .spyOn(axios, "get")
        .mockResolvedValueOnce({ data: "<div>teresa teng</div>" });
      const actual = await getHtml("http://localhost:3000");

      expect(actual).toEqual("<div>teresa teng</div>");
      expect(getSpy).toBeCalledWith("http://localhost:3000");
    });
  });

  describe("cheerioInit", () => {
    it("should initializes cheerio", async () => {
      const loadSpy = jest.spyOn(cheerio, "load").mockImplementation();
      jest
        .spyOn(axios, "get")
        .mockResolvedValueOnce({ data: "<div>teresa teng</div>" });

      await cheerioInit("http://localhost:3000");
      expect(loadSpy).toHaveBeenCalledWith("<div>teresa teng</div>");
    });
  });
});
