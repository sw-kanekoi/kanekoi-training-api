const axios = require("axios");

const ZIPCLOUD_API = "https://zipcloud.ibsnet.co.jp/api/search?zipcode=";

async function getFromZipCloud(zipcode) {
  try {

    // URL作成してリクエスト送信
    const url = ZIPCLOUD_API + zipcode;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

module.exports = { getFromZipCloud };
