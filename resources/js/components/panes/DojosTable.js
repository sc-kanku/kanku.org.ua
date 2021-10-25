import React, {useMemo, useState, useEffect} from 'react';
import EditButton from '../controls/buttons/EditButton';
import EditableTable from './../controls/EditableTable';

// TODO remove jquery
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
            Header: "Ім'я",
            accessor: "name"
          },
          {
            Header: "Львів / Область",
            accessor: "point"
          },
        ]},{
          Header: "Add",
          columns: [
            {
                Header: "Адреса",
                accessor: "address"
            },
          ]
        },
        {
        Header: "Details",
        columns: [
            {
                Header: "Район",
                accessor: "district"
              },
          {
            Header: "url",
            accessor: "url"
          },
          {
            Header: "Проводяться тренування",
            accessor: "is_actual"
          },
          /*
          {
            Header: "place",
            accessor: "place"
          },
*/
          {
            Header: "Координати на гугл-мапах",
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
