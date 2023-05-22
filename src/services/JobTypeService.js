import axios from "axios";

const url='http://localhost:8080/';


class JobTypeService {
    getAllType(){
        return axios.get(url+"types")
    }
}

export default new  JobTypeService;