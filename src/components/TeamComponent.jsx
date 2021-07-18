const  TeamComponent = ({teams})=>{
    const teamList = teams.map(team=><li key={team.id}>{team.name}</li>)
    return(
        <div>
            <h5>Teams of the Organization</h5>
            {teamList}
        </div>
    )
}


export default TeamComponent