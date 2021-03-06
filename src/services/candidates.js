import apiClient from "../utils/api";
import { showErrorNotification , showSuccessNotification} from '../utils/toast';


const fortmatResponse = (res) => {
  return JSON.stringify(res, null, 2);
};

export async function findCandidate({email,linkedInProfile}) {
  if (email || linkedInProfile) {
    let url = `candidates/getCandidateByAny?email=${email}`;
    if(linkedInProfile){
      url = `candidates/getCandidateByAny?linkedInProfile=${linkedInProfile}`;
    } 
    try {
      const res = await apiClient.get(url);
      
      if(res?.data?.code !== 200){
        throw new Error(res.data.message || "user not found");
      }
      const result = res?.data?.candidate;
      console.log("getRecruter",fortmatResponse(result))
      return result;
    } catch (err) {
      console.log("getRecruter",fortmatResponse(err.response?.data || err))

      showErrorNotification(err.message);
      
      return err;
    }
  }
}

export async function createCandidates(postData) {
    try {
        const res = await apiClient.post("/candidates/addcandidate?", postData, {
          headers: {
            "x-access-token": "token-value",
          },
        });

        if(res?.data?.code !== 200){
          throw new Error(res.data.message || "User info already added!!");
        }
  
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        console.log("createCandidates",fortmatResponse(result))
        showSuccessNotification('Data Added Successfully!! Add more people');
        return result;
      } catch (err) {
        console.log(fortmatResponse(err.response?.data || err));

        showErrorNotification(err.message);

        return err;
      }
  }

