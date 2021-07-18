import { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import ReactPaginate from "react-paginate";
import React from 'react'
import {EmployeeCreation} from './AddEmployee'
import { Employees } from '../shared/employee';


const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);
  
    const sortedItems = React.useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);


    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };
    
    return { items: sortedItems, requestSort, sortConfig };
};

const  EmployeeComponent = ({employees,team})=>{

  useEffect(()=>{
    console.log('employees updated')
  },[Employees])
    const { items , requestSort, sortConfig } = useSortableData(employees);
    const [currentPage, setCurrentPage] = useState(0);
    
    const handlePageClick = ({selected : selectedPage})=> setCurrentPage(selectedPage)
 
    const getClassNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const PER_PAGE  = 10
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(items.length / PER_PAGE);
    const employeList  = items.slice(offset,offset+PER_PAGE).map(employee=>{
        return(<tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.ID}</td>
            <td>{employee.phone}</td>
            <td>{employee.email}</td>  
            <td>{employee.level===3?'Team Lead':'Employee' }</td>  
        </tr>)
    })  
    return(
        <div className='mx-2'>
          <div className='d-flex justify-content-between m-2 align-items-baseline'>
            <h5>Employees</h5>
            <EmployeeCreation team={team} type='new' />
          </div> 
            <Table striped>
                <thead>
                    <tr onClick={(e)=>{requestSort(e.target.id)}}>
                        <th id='name' className={getClassNamesFor('name')}>Name</th>
                        <th id='ID' className={getClassNamesFor('ID')}>ID</th>
                        <th id='phone' className={getClassNamesFor('phone')}>Phone Number</th>
                        <th id='email' className={getClassNamesFor('email')}>Email ID</th>
                        <th id='designation'>Designation</th>
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
        </div>
    )
}




export default EmployeeComponent