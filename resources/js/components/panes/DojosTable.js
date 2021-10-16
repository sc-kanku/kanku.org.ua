import React, {useMemo, useState, useEffect} from 'react';
import EditButton from '../controls/buttons/EditButton';
import EditableTable from './../controls/EditableTable';

// {athletes.length ? <AthletesTable athletes={athletes} /> : <p>No Athletes</p>}
function DojosTable() {
    const columns = useMemo(() => [{
        Header: "Search",
        columns: [
          {
            Header: <i className="fas fa-edit"></i>,
            accessor: "id",
            Cell: ({ value }) => <EditButton hrefPrefix='/admin/dojo' value={value} />
          },
          {
            Header: "name",
            accessor: "name"
          },
          {
            Header: "point",
            accessor: "point"
          },
        ]},{
          Header: "Add",
          columns: [
            {
                Header: "address",
                accessor: "address"
            },
          ]
        },
        {
        Header: "Details",
        columns: [
            {
                Header: "district",
                accessor: "district"
              },
          {
            Header: "url",
            accessor: "url"
          },
          {
            Header: "is_actual",
            accessor: "is_actual"
          },
          /*
          {
            Header: "place",
            accessor: "place"
          },
*/
          {
            Header: "coords",
            accessor: "coords"
          },
          /*
          {
            Header: "is_manual",
            accessor: "is_manual"
          },*/
          /*
          {
            Header: "info",
            accessor: "info",
            headerClassName: 'col-3'
          }*/
        ]}
    ],[]
  );

  return (
    <EditableTable 
      columns={columns} 
      entity='dojo'
    />
  );
}

export default DojosTable;
