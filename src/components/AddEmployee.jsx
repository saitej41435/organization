import {createRef, useContext, useState} from 'react'
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {CreateModal} from './CreationModal'
import {Employees} from '../shared/employee'
import {EmployeeContext} from '../App'

export function EmployeeCreation({team,type}){
    
    const [modal, setModal] = useState(false); 
    const toggle = () => setModal(!modal);
    const modalRef = createRef()
    
    return(
        <div>
            <Button className='text-capitalize btn btn-secondary mr-4' onClick={toggle}>{type} Employee</Button>
            <CreateModal modal={modal} toggle={toggle} form={EmployeeForm(type==='new'?'Save':'Update',team,toggle)}  header='New Employee' />    
        </div>
        
    )
}

function EmployeeForm(buttonLabel,team,toggleModal){
    const setAllEmployees = useContext(EmployeeContext)
    console.log(team)
    const initial = {'name':'','email':'','phone':''}
    const [employee,setEmployee] = useState(initial)
    console.log(employee)
   const handlechange =(e) =>{
         const {name,value} = e.target
         setEmployee({...employee,[name]:value})
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        console.log(employee)
        employee['team'] = team
        Employees.push(employee)
        setAllEmployees(pre=>{console.log(pre);return pre})
        setEmployee(initial)
        toggleModal()
    }

    return(
        <form onSubmit={handleSubmit}>
                        <div className='row my-2'>
                            <div className='col-4'>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className='col-8'>
                                <input type="text" name='name' className="form-control" value={employee.name} onChange={handlechange} required/>
                            </div>
                        </div>
                        <div className='row my-2'>
                            <div className='col-4'>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className='col-8'>
                                <input type="email" name='email' className='form-control' value={employee.email} onChange={handlechange} required />
                            </div>
                        </div>
                        <div className='row my-2'>
                            <div className='col-4'>
                                <label htmlFor="phone">Phone</label>
                            </div>
                            <div className='col-8'>
                                <input type="tel" name='phone' className='form-control' value={employee.phone} onChange={handlechange} required />
                            </div>
                        </div>
                        <div style={{'float':'right'}}>
                            <button type="submit" className='btn btn-primary m-2' >{buttonLabel}</button>
                            <button type="reset" className='btn btn-secondary n-2' onClick={toggleModal}>Cancel</button>
                        </div>
                    </form>
    )
}