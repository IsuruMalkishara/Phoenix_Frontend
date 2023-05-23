import axios from "axios";

const url='http://localhost:8080/';


class VacancyService {
    getAllVacancy(){
        return axios.get(url+"vacancy")
    }

    //search vacancies by company
searchByCompany(companyId){
    return axios.get(url+"company/"+companyId)
  }
  
  //search vacancies by selected data
  searchBySelectedData(data){
    return axios.post(url+"search_data",data)
  }
}

export default new VacancyService;