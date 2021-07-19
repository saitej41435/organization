import { useEffect, useMemo, useState } from 'react';
import { Table } from 'reactstrap';
import ReactPaginate from "react-paginate";
import React from 'react'
import {EmployeeCreation,EmployeeForm, TeamForm} from './AddEmployee'
import Employees from '../shared/employee';
import Teams from '../shared/teams'
import {CreateModal} from './CreationModal'


const  EmployeeComponent = ({filter,employees,teams})=>{

    const [currentPage, setCurrentPage] = useState(0);
    const [employeeFilter,setEmployeeFilter] = useState({'name':'','phone':'','email':'','designation':''})
    const [filteredEmployees,setEmployees] = useState(employees)

    const initialEmployee ={'name':'','email':'','phone':''}
    const [selectedEmployee,setSelectedEmployee] = useState(initialEmployee)
    const [modal, setModal] = useState(false); 
    const [teamModal,setTeamModal] = useState(false)
    const PER_PAGE  = 10
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(employees.length / PER_PAGE);
    const toggle = () => setModal(!modal)
    const teamToggle = () =>setTeamModal(!teamModal)

    const handlePageClick = ({selected : selectedPage})=> setCurrentPage(selectedPage)
 
    useEffect(()=>{
      setEmployees(employees)
    },[employees])
    
    const editEmployee = (e)=>{
      if(e.target.value==='edit'){
        const employee = employees.filter(employee=>employee.id===e.target.id)[0]
        setSelectedEmployee(employee)
        toggle()
      }
      if(e.target.value==='delete'){
        const id = e.target.id
        const ids = Employees.map(e=>e.id)
        
        delete Employees[ids.indexOf(id)]
      }
      
      
    }
    const newEmployee = (e)=>{  
      setSelectedEmployee(initialEmployee)
      toggle()
    }

    const newTeam = (e) =>{
      teamToggle()
    }

    const addFilter =(e)=>{
      const {name,value} = e.target

      setEmployeeFilter({...employeeFilter,[name]:value})
      // filterBy(employees,{...employeeFilter,[name]:value})
    }

    useEffect(()=>{
      const filteredEmployees = employees.filter(e=>{
        if(employeeFilter.name=='' && employeeFilter.email==''  && employeeFilter.phone==''){
          return e
        }
        else if((
            e.name.toLowerCase().includes(employeeFilter.name.toLowerCase()) &&
            e.email.toLowerCase().includes(employeeFilter.email.toLowerCase())   &&
            e.phone.includes(employeeFilter.phone)  
        )){
          return e
        }
      })
      setEmployees(filteredEmployees)
    },[employeeFilter])
    

    const employeList  = filteredEmployees.slice(offset,offset+PER_PAGE).map(employee=>{
      return(<tr key={employee.id}>
          <td>{employee.name}</td>
          <td>{employee.email}</td> 
          <td>{employee.phone}</td> 
          <td>{employee.level===3?'Team Lead':employee.level===2?'Head':employee.department }</td>  
          <td><button className='btn btn-warning' id={employee.id} value='edit' >Edit</button></td>
          <td><button className='btn btn-danger' id={employee.id} value='delete'>Delete</button></td>
      </tr>)
  })  

    return(
        <div className='mx-2'>
          <div className='d-flex justify-content-between m-2 align-items-baseline'>
            <h5>Employees</h5>
            <div>
              { !filter.department && <button className='text-capitalize btn btn-secondary mr-4' onClick={newEmployee}>New Employee</button>}
              { filter.department && <button className='text-capitalize btn btn-secondary mr-4' onClick={newTeam}>New Team</button>}
            </div>
          </div> 
          <div>
          </div>
            <Table striped onClick={editEmployee}>
                <thead>
                    <tr>
                        <th id='name'>Name</th>
                        <th id='email'>Email ID</th>
                        <th id='phone'>Phone Number</th>
                        <th id='designation'>Designation</th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th><input type="text" name='name' value={employeeFilter.name} className='form-control' onChange={addFilter}/></th>
                        <th><input type="text" name='email' value={employeeFilter.email} className='form-control' onChange={addFilter}/></th>
                        <th><input type="text" name='phone' value={employeeFilter.phone} className='form-control' onChange={addFilter}/></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {employeList}
                </tbody>
            </Table>
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
            />
          
           <CreateModal modal={modal} toggle={toggle} >
            <div>
              <EmployeeForm team={filter.team} 
                  teams={teams} 
                  toggle={toggle} 
                  oldEmployee={selectedEmployee}></EmployeeForm>
            </div>
          </CreateModal>

          <CreateModal modal={teamModal} toggle={teamToggle} >
            <div>
            <TeamForm department={filter.department} toggle={teamToggle} />
            </div>
          </CreateModal>

        </div>
    )
}


export default EmployeeComponent