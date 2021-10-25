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
            Header: "Заголовок",
            accessor: "title"
          },
          {
            Header: "Дата",
            accessor: "dateAt"
          },
        ]},{
          Header: "Add",
          columns: [
            {
                Header: "Ключові слова",
                accessor: "keywords"
            },
          ]
        },
        {
        Header: "Details",
        columns: [
            {
                Header: "Категорія",
                accessor: "category"
              },
          {
            Header: "Повний текст новини",
            accessor: "full"
          },
          {
            Header: "Скорочений текст новини",
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
