import React, {useMemo, useState, useEffect} from 'react';
import EditButton from '../controls/buttons/EditButton'
import EditableTable from './../controls/EditableTable';

// {athletes.length ? <AthletesTable athletes={athletes} /> : <p>No Athletes</p>}
function AthletesTable() {

     /* 
    - Columns is a simple array right now, but it will contain some logic later on. It is recommended by react-table to memoize the columns data
    - Here in this example, we have grouped our columns into two headers. react-table is flexible enough to create grouped table headers
  */
  const columns = useMemo(
    () => [{
        Header: "Search",
        columns: [
          {
            Header: <i className="fas fa-user-edit"></i>,
            accessor: "id",
            Cell: ({ value }) => <EditButton hrefPrefix='/admin/athlete' value={value} />
          },
          {
            Header: "lastName",
            accessor: "lastName"
          },
          {
            Header: "firstName",
            accessor: "firstName"
          }
        ]},{
          Header: "Add",
          columns: [
            {
              Header: "patronymic",
              accessor: "patronymic"
            }
          ]
        },
        {
        Header: "Details",
        columns: [
          {
            Header: "degree",
            accessor: "degree"
          },
          {
            Header: "email",
            accessor: "email"
          },
          {
            Header: "is_coach",
            accessor: "is_coach"
          },
          {
            Header: "is_best",
            accessor: "is_best"
          },
          {
            Header: "is_actual",
            accessor: "is_actual"
          },
          {
            Header: "phone",
            accessor: "phone"
          },
          {
            Header: "phone2",
            accessor: "phone2",
            headerClassName: 'col-3'
          }]}
    ],[]
  );

  return (
      <EditableTable 
        columns = {columns} 
        entity = 'athlete'
      />
  );
}

export default AthletesTable;
