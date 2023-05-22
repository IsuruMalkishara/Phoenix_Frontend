import axios from "axios";

const url='http://localhost:8080/';


class JobCategoryService {
    getAllCategory(){
        return axios.get(url+"categories")
    }
}

export default new JobCategoryService;