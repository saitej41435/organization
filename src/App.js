import logo from './logo.svg';
import './App.css';
import {Employees} from './shared/employee'
import HeadsComponent from './components/HeadComponent'
import TeamComponent from './components/TeamComponent'
import EmployeeComponent from './components/EmployeeComponent'
import { useEffect, useState } from 'react';
import React from 'react'

export const EmployeeContext = React.createContext()

function App() {
  const ceo = Employees.filter(employee =>employee.level===1)[0]
  const heads = Employees.filter(employee => employee.level === 2)
  // const employees = Employees.map(employee=><li key={employee.id}>{employee.name}</li>)
  const [allEmployees,setAllEmployees] = useState(Employees)
  const [selectedEmployees, setEmployees] = useState(null)
  const [selectedTeam, setTeam] = useState(null)

  const updateTeam = (team)=> setTeam(team)

  useEffect(()=>{
    console.log(allEmployees)
    selectedTeam && setEmployees(allEmployees.filter(employee=>employee.team===selectedTeam),console.log(allEmployees))
  },[allEmployees,selectedTeam])

  // useEffect(()=>{
  //   selectedTeam && setEmployees(Employees.filter(employee=>employee.team===selectedTeam))
  // },[Employees])

  return (
    <div className="App">
      <div className='row mt-5'>
        <div className='col-4'>
          <HeadsComponent ceo={ceo} heads={heads} setTeam={updateTeam} selectedTeam={selectedTeam} />
        </div>
          {selectedEmployees &&  selectedTeam && <div className='col-8'>
            <EmployeeContext.Provider value={setAllEmployees} >
              < EmployeeComponent employees={selectedEmployees} team={selectedTeam} />
            </EmployeeContext.Provider>
            
            </div>
          }
      </div>
    </div>
  );
}

export default App;
