import logo from './logo.svg';
import './App.css';
import {Col, Row, Container, Form } from 'react-bootstrap';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';

function App() {
  let [formData,setFormData]=useState({
    uname:'',
    uemail:'',
    uphone:'',
    umessage:'',
    index:''

  })

  let [userData,setUserData]=useState([])

let getValue=(event)=>{
  let oldData={...formData}
  let inputName=event.target.name;
  let inputValue=event.target.value;
  oldData[inputName]=inputValue;
  setFormData(oldData)

}

let handleSubmit=(event)=>{

  let currentUserFormData={
    uname:formData.uname,
    uemail:formData.uemail,
    uphone:formData.uphone,
    umessage:formData.umessage
  }


if (formData.index===""){

  let checkFilterUser=userData.filter((v)=>v.uemail==formData.uemail || v.uphone==formData.uphone)
  if (checkFilterUser.length==1){
    alert('email or phone number already exists')
  }
  else{
    let oldUserData=[...userData,currentUserFormData]
    setUserData(oldUserData)
    setUserData(oldUserData)
    setFormData({
      uname:'',
      uemail:'',
      uphone:'',
      umessage:'',
      index:''
    })
  }
}
else{
  let editIndex=formData.index;
  let oldData=userData;

  let checkFilterUser=userData.filter((v,i)=>(v.uemail==formData.uemail || v.uphone==formData.uphone)&&i!=editIndex)

  if(checkFilterUser.length==0){

  

  oldData[editIndex]['uname']=formData.uname
  oldData[editIndex]['uemail']=formData.uemail
  oldData[editIndex]['uphone']=formData.uphone
  oldData[editIndex]['umessage']=formData.umessage

  setUserData(oldData)
  setFormData({
    uname:'',
    uemail:'',
    uphone:'',
    umessage:'',
    index:''
  })
}
else{
  alert("email or phone no alrwady exsist")
}
}
  event.preventDefault();

}

let deleterow=(indexNumber)=>{
  let filterDataafterDelete=userData.filter((v,i)=> i!=indexNumber)
  // alert(indexNumber)
  setUserData(filterDataafterDelete)
}
  

let editRow=(indexNumber)=>{
    alert(indexNumber)

    let editData=userData.filter((v,i)=>i==indexNumber)[0]
    editData['index']=indexNumber
    setFormData(editData)
}


  return (
    <div className="App">
       <Container fluid>
          <Container>
            <Row>
              <Col className='text-center py-5'>
                <h1>ENQUERY NOW</h1>
              </Col>
            </Row>
            <Row>
              <Col lg={5}>
                {userData.length}
                  <Form onSubmit={handleSubmit}>
                    <div className='pb-3'>
                      <label className='form-label'>Name</label>
                      <input type='text' onChange={getValue} value={formData.uname}  name='uname' className='form-control'/>
                    </div>
                    <div className='pb-3'>
                      <label className='form-label'>Email</label>
                      <input type='email' onChange={getValue} value={formData.uemail} name='uemail' className='form-control'/>
                    </div>
                    <div className='pb-3'>
                      <label className='form-label'>Phone</label>
                      <input type='text' onChange={getValue} value={formData.uphone} name='uphone' className='form-control'/>
                    </div>
                    <div className='mb-3'>
                      <label  for='' class='form-label'>Message</label>
                      <textarea onChange={getValue} class="form-control" value={formData.umessage} name='umessage' id='' rows='3'></textarea>
                    </div>
                    <button className='btn btn-primary'>{formData.index!=='' ? 'Update':'Save'}</button>
                  </Form>
              </Col>
              <Col lg={7}>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Message</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData.length>=1 ? 
                                userData.map((obj,index)=>{
                                  return(
                                    <tr key={index}>
                                      <td> {index+1} </td>
                                      <td> {obj.uname} </td>
                                      <td> {obj.uemail} </td>
                                      <td> {obj.uphone}</td>
                                      <td> {obj.umessage} </td>
                                      <td>
                                        <button onClick={()=>deleterow(index)}>Delete</button>
                                        <button onClick={()=>editRow(index)}>Update</button>
                                      </td>
                                    </tr>
                                  )
                                  })  
                                :
                                  <tr>
                                    <td colSpan={6}>No Data</td>
                                  </tr>
                                    
                        }
                                  
                        
                        
                       
                      </tbody>
                    </Table>
                 

              </Col>
            </Row>
            
          </Container>
      </Container> 
     
    </div> 
  );
}

export default App;
