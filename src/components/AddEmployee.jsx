import {createRef, useContext, useEffect, useState} from 'react'
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Employees from '../shared/employee'
import Teams from '../shared/teams'
import {EmployeeContext} from '../App'


export function EmployeeForm({team,teams,toggle,oldEmployee}){

    const [department,setDepartment] = useState('')
    
    const initial = {'name':'','email':'','phone':''}
    const [employee,setEmployee] = useState(oldEmployee?oldEmployee:initial)

    useEffect(()=>{
        const department =  Teams.filter(t=>t.name===team)[0]
        setDepartment(department && department.department)
    },[])

   const handlechange =(e) =>{
         const {name,value} = e.target
         setEmployee({...employee,[name]:value})
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        if(employee.id){
            Employees.forEach(e=>{
                if(e.id===employee.id){
                    e.name=employee.name
                    e.email= employee.email
                    e.phone=employee.phone
                    e.team = employee.team
                }
            })
        }
        else{
            employee['team'] = team
            employee['id'] = employee.email.split('@')[0]
            employee['department'] = team && Teams.filter(t=>t.name===team)[0].department
            Employees.push(employee)

        }
        setEmployee(oldEmployee)
        toggle()
        alert('Added successfully')
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
                                <input type="tel" name='phone' className='form-control' value={employee.phone} pattern='[0-9]{10}' title="(Enter 10 digits number)" onChange={handlechange} required />
                            </div>
                        </div>
                        {(teams || (team && employee.id )) && <div className='row'>
                            <div className='col-4'>
                                <label htmlFor="team">Team</label>
                            </div>
                            <div className='col-8'>
                            <select className="form-control" id="exampleFormControlSelect1" onChange={handlechange} name='team'>
                                {teams && teams.map(t=><option value={t} key={t}>{t}</option>)}
                                {team && Teams.filter(t=>t.department===department).map(t=><option key={t.name} value={t.name} >{t.name}</option>) }
                            </select>
                            </div>
                        </div>}
                        <div style={{'float':'right'}}>
                            <button type="submit" className='btn btn-primary m-2' >Save</button>
                            <button type="reset" className='btn btn-secondary n-2' onClick={toggle}>Cancel</button>
                        </div>
                        
                    </form>
    )
}




export function TeamForm({department,toggle}){
    const initial = {'name':''}
    const [team,setTeam] = useState(initial)


    const handlechange =(e) =>{
        const {name,value} = e.target
        setTeam({...team,[name]:value})
   }

   const handleSubmit = (e)=>{
        e.preventDefault()
        const  oldteam = Teams.filter(t=>t.name===team.name)
        console.log(oldteam)
        if(oldteam.length){
            alert('This team already exist')
        }
        else{
            team['department'] = department
            team['id'] = team.name
            Teams.push(team)
            toggle()
            alert('Added successfully')
        }
        
   }
    return(
        <form onSubmit={handleSubmit}>
            <div className='row my-2'>
                <div className='col-4'>
                    <label htmlFor="name">Name</label>
                </div>
                <div className='col-8'>
                    <input type="text" name='name' className="form-control" value={team.name} onChange={handlechange} required/>
                </div>                
            </div>
            <div style={{'float':'right'}}>
                <button type="submit" className='btn btn-primary m-2' >Save</button>
                <button type="reset" className='btn btn-secondary n-2' onClick={toggle}>Cancel</button>
            </div>
        </form>
    )
}