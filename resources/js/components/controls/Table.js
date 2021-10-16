import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import Degree from './Degree';
import PostCategory from './PostCategory';
import TableSearch from './TableSearch';

export default function Table({ columns, data, inlineUpdateUrl }) {
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  const updateMyData = (index, id, value) => {
    let inlineEditData = {
      'id': + index + 1,
      'field': id,
      'value': value
    };

    fetch(inlineUpdateUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(inlineEditData)
    }).then(responseSavedSuccess => {
      synchronizeDataOnUpdateSuccess(index, id, value);
  
        // Show toasted message
        // https://getbootstrap.com/docs/5.1/components/toasts/
        // console.log('saved ' + id + ' to ' + value + ' - ' + JSON.stringify(responseSavedSuccess));
      })
      .catch((error) => {
        // console.error('Error:', JSON.stringify(error));
      });
  }

  const synchronizeDataOnUpdateSuccess = (rowIndex, columnId, value) => {
    setSkipPageReset(true);

    // TODO: via context access parent state data var
    /*
    setTableData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }

        return row
      })
    )*/
  }

  React.useEffect(() => {
    setSkipPageReset(false)
  }, [data])

const EditableDegree = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  const [value, setValue] = React.useState(initialValue);

  const onChange = e => {
    let newValue = e.target.value;
    setValue(newValue);

    updateMyData(index, id, newValue);
  }

  return <Degree value={value} editable="true" onChange={onChange} />
};

const EditablePostCategory = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  const [value, setValue] = React.useState(initialValue);

  const onChange = e => {
    let newValue = e.target.value;
    setValue(newValue);

    updateMyData(index, id, newValue);
  }

  return <PostCategory value={value} editable="true" onChange={onChange} />
};


// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  initialValue = initialValue != null ? initialValue : '';

  const [value, setValue] = React.useState(initialValue);
  const [previousValue, setPreviousValue] = React.useState(initialValue);

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
      if (previousValue != value) {
        updateMyData(index, id, value);
  
        setPreviousValue(value);
      }
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input value={value} onChange={onChange} onBlur={onBlur} />
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: info => {
    if (info.column.id == "degree") {
      return (<EditableDegree {...info} />)
    } if (info.column.id == "category") {
      return (<EditablePostCategory {...info} />)
    } else {
      return <EditableCell {...info} />
    }

    
  }
}

// Use the useTable Hook to send the columns and data to build the table
const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setGlobalFilter // The useFilter Hook provides a way to set the filter
  } = useTable({
      columns,
      data,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      updateMyData
    },
    useGlobalFilter, // Adding the useFilters Hook to the table
      // You can add as many Hooks as you want. Check the documentation for details. You can even add custom Hooks for react-table here
    useSortBy // This plugin Hook will help to sort our table columns
  );

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
 // Input element
  return (<>
    <table {...getTableProps()} className="table table-striped table-hover table-sm">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column =>  {
                function getColumnStyle(column) {
                    let customStyle = {};
                    
                    if (column.id == 'phone' || column.id == 'phone2') {
                        customStyle = {
                            style: {minWidth: '12rem'}
                        };
                    } else if (column.id == 'id') {
                        customStyle = {
                            style: {maxWidth: '2em'}
                        };
                    }

                    return customStyle;
                }

// {...column.getHeaderProps(column.getSortByToggleProps())} 
// {...column.getHeaderProps(getColumnStyle(column))} 

                let content = (column.originalId == "Search") 
                    ? <> 
                        <TableSearch setGlobalFilter={setGlobalFilter} /> {(rows.length != data.length) ? rows.length + ' / ' + data.length : data.length}
                      </>
                    : column.render("Header");

                let sortingIcon = column.columns 
                  ? ""
                  : <i className={column.isSorted
                      ? column.isSortedDesc
                          ? "fas fa-sort-up"
                          : "fas fa-sort-down"
                        : "fas fa-sort"
                  }></i>;

                return (
                    <th 
                      
                      {...column.getHeaderProps(column.getSortByToggleProps())} 
                      scope="col"
                    >{sortingIcon} {content}
                    </th>
                )
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    </>
  );
}
