import React, {useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import NavBarComponent from './NavBarComponent';
import { Card, Form, Button} from 'react-bootstrap';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ReactPaginate from "react-paginate";
import JobCategoryService from '../services/JobCategoryService';
import JobTypeService from '../services/JobTypeService';
import JobModalityService from '../services/JobModalityService';
import VacancyService from '../services/VacancyService';

function HomePage() {

    const [typeList, setTypeList] = useState([]);
    const [modalityList, setModalityList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [categoryId,setCategoryId]=useState('');
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedModalities, setSelectedModalities] = useState([]);
    const [vacancies, setVacancies]=useState([]);
    const [expandedVacancyId, setExpandedVacancyId] = useState(null);

    const [pageNumber, setPageNumber] = useState(0);

    const jobsPerPage = 5;
    const pagesVisited = pageNumber * jobsPerPage;
    const pageCount = Math.ceil(vacancies.length / jobsPerPage);
    

    useEffect(() => {

        getType();
        getCategory();
        getModality();
      getAllVacancy();}, []);
    
   

//get types list
const getType=()=>{
JobTypeService.getAllType().then(res=>{
console.warn(res.data);
setTypeList(res.data);
})
}

//get category list
const getCategory=()=>{
    JobCategoryService.getAllCategory().then(res => {
        console.warn(res.data);
        setCategoryList(res.data);
      }).catch(error => {
        console.log(error);
      });
    }

//get modality list
const getModality=()=>{
    JobModalityService.getAllModality().then(res=>{
    console.warn(res.data);
    setModalityList(res.data);
    })
    }

    // handle type selection
  const handleTypeChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTypes((prevSelectedTypes) => [...prevSelectedTypes, value]);
    } else {
      setSelectedTypes((prevSelectedTypes) =>
        prevSelectedTypes.filter((type) => type !== value)
      );
    }
  };

  // handle modality selection
  const handleModalityChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedModalities((prevSelectedModalities) => [
        ...prevSelectedModalities,
        value,
      ]);
    } else {
      setSelectedModalities((prevSelectedModalities) =>
        prevSelectedModalities.filter((modality) => modality !== value)
      );
    }
  };

  //get Vacancy list
const getAllVacancy=()=>{
    VacancyService.getAllVacancy().then(res=>{
    console.warn(res.data);
    setVacancies(res.data);
    })
    }

    // Function to handle vacancy title click and toggle visibility
const handleVacancyClick = (vacancyId) => {
  if (expandedVacancyId === vacancyId) {
    setExpandedVacancyId(null);
  } else {
    setExpandedVacancyId(vacancyId);
  }
};

const changePage = ({ selected }) => {
  setPageNumber(selected);
};


  return (
    <div className='home'>
      <div>
        <NavBarComponent/>
      </div>
      <div >
        <div className='row'>
            <div className='col-3'>
            <Card style={{ margin:'20px' , background:'rgba(255, 255, 255, 0.137)'}}>
                 <Card.Body>
                    <div className='row'>
                      <div className='col'> <Button variant="primary">Search</Button></div>
                    </div>
                    <div className='row'>Job Categories</div>
                    <div className='row'>
                        <div className='col'>
                        <Form.Control
                         as='select'
                         className='input'
                        value={categoryId}
                        onChange={(event) => setCategoryId(event.target.value)}
                           >
                        <option >
                            Select Category
                       </option>
      {categoryList.map((category) => (
        <option key={category.id} value={category.id}>
          {category.title}
        </option>
      ))}
    </Form.Control>
                        </div>
                    </div>
                    <div className='row'>Job Types</div>
<div className='row'>
  {typeList.map((type) => (
    <Form.Check
      key={type.id}
      type='checkbox'
      label={type.title}
      value={type.id}
      onChange={handleTypeChange}
      checked={selectedTypes.includes(type.id)}
      style={{ marginTop: '0', marginBottom: '0' }} // Add custom styles to remove the gap
    />
  ))}
</div>

<div className='row'>Job Modalities</div>
<div className='row'>
  {modalityList.map((modality) => (
    <Form.Check
      key={modality.id}
      type='checkbox'
      label={modality.title}
      value={modality.id}
      onChange={handleModalityChange}
      checked={selectedModalities.includes(modality.id)}
      style={{ marginTop: '0', marginBottom: '0' }} // Add custom styles to remove the gap
      
    />
  ))}
</div>
                 </Card.Body>
            </Card>
            </div>
            <div className='col-9'>
              {
                vacancies.slice(pagesVisited, pagesVisited + jobsPerPage).map((vacancy)=>(
                  <Card style={{ margin:'20px' , background:'rgba(255, 255, 255, 0.137)'}}>
                 <Card.Body>

                  <div className='row'><div className='col' style={{ textAlign:'right' }}><Button variant="primary">Apply</Button></div></div>
                   <div className='row'>
                    <div className='col-2'>
                    <img
              src={vacancy.employer.logo}
              width="70"
              height="70"
              className="d-inline-block align-top"
              alt="Phoenix Logo"
            />
                    </div>
                    <div className='col-10' style={{ textAlign:'left' }}>
                    <div
                  className='row'
                 onClick={() => handleVacancyClick(vacancy.id)}
                 style={{ cursor: 'pointer' }}><h5>{vacancy.title}</h5></div>
                      <div className='row'><h6>
                        {vacancy.employer.verification &&(
                        <VerifiedUserIcon/> )}{vacancy.employer.name}</h6></div>
                      <div className='row'><p>{vacancy.employer.address}</p></div>
                    </div>
                    </div>
                    <div className='row'>
                      <div className='col-4'style={{textAlign:'left'}}><p>Category: {vacancy.category.title}</p></div>
                      <div className='col-4'style={{textAlign:'left'}}><p>Type: {vacancy.type.title}</p></div>
                      <div className='col-4'style={{textAlign:'left'}}><p>Modality: {vacancy.modality.title}</p></div>
                    </div>
                    <div className='row'>
                      <div className='col-6' style={{textAlign:'left'}}><p>Posted Date: {vacancy.postedDate}</p></div>
                      <div className='col-6' style={{textAlign:'left'}}><p>Expiration Date: {vacancy.expirationDate}</p></div>
                      
                    </div>
                    
                    <div className='row'>
                    {expandedVacancyId === vacancy.id && (
                      <div className='col' style={{textAlign:'left'}}> <div dangerouslySetInnerHTML={{ __html: vacancy.description }} /></div>
                    )}
                      </div>

                    <div className='row' style={{ color:'#FFFF',marginTop:'10px',textAlign:'center' }}>
  {vacancy.descriptionImg && expandedVacancyId === vacancy.id && (
    <div>
      <img
        src={vacancy.descriptionImg}
        alt='description'
        height={'350px'}
        width={'350px'}
      />
    </div>
  )}
</div>
                 </Card.Body>
                 </Card>
                ))
              }
              <div className='row'>
      <div className='col' style={{ textAlign:'right' }}>
        <div className='pagination'>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={ pageCount }
        onPageChange={changePage}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
      </div>
    </div>
               
                </div>
            </div>
        </div>
      </div>

    </div>
  )
}

export default HomePage
