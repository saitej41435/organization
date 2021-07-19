import logo from './logo.svg';
import './App.css';
import Employees from './shared/employee'
import Teams from './shared/teams'
import HeadsComponent from './components/HeadComponent'
import TeamComponent from './components/TeamComponent'
import EmployeeComponent from './components/EmployeeComponent'
import { useEffect, useState } from 'react';
import React from 'react'

export const EmployeeContext = React.createContext()

function App() {
  const ceo = Employees.filter(employee =>employee.level===1)[0]
  const heads = Employees.filter(employee => employee.level === 2)
  const [employees,setEmployees] = useState(Employees)
  const [selectedFilter, setFilter] = useState(null)
  const [teams,setTeams] = useState(Teams)

  const updateFilter = (filter)=> setFilter(filter)

  useEffect(()=>{
    
    if(selectedFilter){
      const teams = Teams.filter(t=>t.department===selectedFilter.department).map(team=>team.name)
      // const teams = selectedFilter ? Teams.filter(team=>team.department===filter.department).map(team=>team.name) : teams
      if(teams.length){
        const employees= Employees.filter(employee=>teams.includes(employee.team) || employee.department===selectedFilter.department)
        setEmployees(employees)
        setTeams(teams)
      }
      else{
          setEmployees(Employees.filter(employee=>employee.team===selectedFilter.team))
          setTeams(null)
        }
    }
  },[selectedFilter])

  return (
    <div className="App">
      <div className='row mt-5'>
        <div className='col-4'>
          <HeadsComponent ceo={ceo} heads={heads} setFilter={updateFilter} selectedFilter={selectedFilter} />
        </div>
          {selectedFilter && <div className='col-8'>
              < EmployeeComponent filter={selectedFilter} employees={employees}  teams={teams}/>
            </div>
          }
      </div>
    </div>
  );
}

export default App;
