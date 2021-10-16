import React, {useMemo, useState, useEffect} from 'react';
import EditButton from '../controls/buttons/EditButton';
import EditableTable from './../controls/EditableTable';

// {athletes.length ? <AthletesTable athletes={athletes} /> : <p>No Athletes</p>}
function PostsTable() {
    const columns = useMemo(() => [{
        Header: "Search",
        columns: [
          {
            Header: <i className="fas fa-edit"></i>,
            accessor: "id",
            Cell: ({ value }) => <EditButton hrefPrefix='/admin/post' value={value} />
          },
          {
            Header: "title",
            accessor: "title"
          },
          {
            Header: "dateAt",
            accessor: "dateAt"
          },
        ]},{
          Header: "Add",
          columns: [
            {
                Header: "keywords",
                accessor: "keywords"
            },
          ]
        },
        {
        Header: "Details",
        columns: [
            {
                Header: "category",
                accessor: "category"
              },
          {
            Header: "full",
            accessor: "full"
          },
          {
            Header: "brief",
            accessor: "brief"
          }
        ]}
    ],[]
  );

  return (
    <EditableTable 
      columns={columns} 
      entity='post'
    />
  );
}

export default PostsTable;
