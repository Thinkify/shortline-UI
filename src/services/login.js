import apiClient from "../utils/api";

const fortmatResponse = (res) => {
  return JSON.stringify(res, null, 2);
};

export async function getRecruter(email) {
  if (email) {
    try {
      const res = await apiClient.get(`recruter/${email}`);

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log("getRecruter",fortmatResponse(result))
      return result;
    } catch (err) {
      console.log("getRecruter",fortmatResponse(err.response?.data || err))
      return err;
    }
  }
}

export async function createRecruter(postData) {
    try {
        const res = await apiClient.post("/recruter/addrectuter", postData, {
          headers: {
            "x-access-token": "token-value",
          },
        });
  
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };
        console.log("getRecruter",fortmatResponse(result))
        return result;
      } catch (err) {
        console.log(fortmatResponse(err.response?.data || err));
        return err;
      }
  }

