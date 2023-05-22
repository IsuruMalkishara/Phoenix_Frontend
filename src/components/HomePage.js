import React, {useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import NavBarComponent from './NavBarComponent';
import { Card, Form, Button} from 'react-bootstrap';
import JobCategoryService from '../services/JobCategoryService';
import JobTypeService from '../services/JobTypeService';
import JobModalityService from '../services/JobModalityService';

function HomePage() {

    const [typeList, setTypeList] = useState([]);
    const [modalityList, setModalityList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [categoryId,setCategoryId]=useState('');
    const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedModalities, setSelectedModalities] = useState([]);
    

    useEffect(() => {

        getType();
        getCategory();
        getModality() }, []);
    
   

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
            <div className='col-9'></div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
