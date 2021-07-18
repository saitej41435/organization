import { useState } from 'react'
import {Teams} from '../shared/employee'

const  HeadsComponent = ({ceo,heads,setTeam, selectedTeam})=>{

    const [selectedDepartment, setDepartment] = useState(null)

    const getTeams = (department)=>{
        return(
            <ul>
                {selectedDepartment && Teams.filter(team=>team.department===selectedDepartment).map(team=><li key={team.id} id={team.name} className={team.name===selectedTeam ? 'active':null}>{team.name}</li>)}
            </ul>
        )
    }
    const headsList = heads.map(head =><ul key={head.department}><li key={head.id} onClick={()=>{setDepartment(head.department)}}><span>{head.name} (Head of {head.department})</span></li>{head.department===selectedDepartment &&  getTeams()}</ul>)
    return(
        <div className='head'>
            {/* <h5>Heads of the Organization</h5> */}
            <ul>
                <li>{ceo.name} (CEO)</li>
                <ul onClick={(e)=>setTeam(e.target.id)}>
                    {headsList}
                </ul>
            </ul>
        </div>
    )
}


export default HeadsComponent