import axios from "axios";

const url='http://localhost:8080/';


class JobModalityService {
    getAllModality(){
        return axios.get(url+"modalities")
    }
}

export default new  JobModalityService;