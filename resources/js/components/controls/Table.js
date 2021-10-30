import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import Degree from './Degree';
import PostCategory from './PostCategory';
import TableSearch from './TableSearch';
import useEditable from '../utils/useEditable';

export default function Table({ columns, data, inlineUpdateUrl }) {
  const [skipPageReset, setSkipPageReset] = React.useState(false);

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

  // const [save] = useSave(inlineUpdateUrl, synchronizeDataOnUpdateSuccess);

  React.useEffect(() => {
    setSkipPageReset(false)
  }, [data])

const EditableDegree = ({ id, field, initialValue }) => {
  const [Editable, value, onChange] = useEditable({ id, field, initialValue, inlineUpdateUrl, 
    onBeforeSuccess: synchronizeDataOnUpdateSuccess,
    getNewValue: (e) => e.target.value
   });

  return <>
      <Editable />
      <Degree value={value} editable="true" onChange={onChange} />
  </>
};

const EditablePostCategory = ({ id, field, initialValue }) => {
  const [Editable, value, onChange] = useEditable({ id, field, initialValue, inlineUpdateUrl, 
    onBeforeSuccess: synchronizeDataOnUpdateSuccess,
    getNewValue: (e) => e.target.value
  });

  return <>
      <Editable />
      <PostCategory value={value} editable="true" onChange={onChange} />
  </>
}; 

// Create an editable cell renderer
const EditableDateCell = ({ id, field, initialValue }) => {
  // We need to keep and update the state of the cell normally
  initialValue = initialValue != null ? initialValue : '';

  const [Editable, value, onChange] = useEditable({ id, field, initialValue, inlineUpdateUrl, 
    onBeforeSuccess: synchronizeDataOnUpdateSuccess,
    getNewValue: (e) => e.target.value
  });

  return <>
    <Editable />
    <input type="date" value={value} onChange={onChange} />
  </>
}

// Create an editable cell renderer
const EditableSwitchCell = ({ id, field, initialValue }) => {
    // We need to keep and update the state of the cell normally
    initialValue = initialValue != null ? initialValue : '';

    const [Editable, value, onChange] = useEditable({ id, field, initialValue, inlineUpdateUrl, 
        onBeforeSuccess: synchronizeDataOnUpdateSuccess, 
        getNewValue : (e) => 1 - value
      });
  
    return <>
      <Editable />
      <div className="form-check form-switch">
        <input className="form-check-input mx-auto" type="checkbox" role="switch" onChange={onChange} checked={value == 1} />
      </div>
    </>
}

// Create an editable cell renderer
const EditableCell = ({ id, field, initialValue }) => {
  // We need to keep and update the state of the cell normally
  initialValue = initialValue != null ? initialValue : '';

  const [Editable, value, onChange, setValue] = useEditable({ id, field, initialValue, inlineUpdateUrl, 
      onBeforeSuccess: synchronizeDataOnUpdateSuccess, 
      getNewValue : (e) => value
    });

    const onTypingChange = e => setValue(e.target.value)
    
    return <>
      <Editable />
      <input value={value} onChange={onTypingChange} onBlur={onChange} />
    </>
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: info => {
    let attributes = {
      id: info.row.index + 1,
      field: info.column.id,
      initialValue: info.value,
//      save: info.save
    }

    if (info.column.id == "degree") {
      return (<EditableDegree {...attributes} />)
    } else if (info.column.id == "category") {
      return (<EditablePostCategory {...attributes} />)
    } else if (info.column.id == "is_coach" 
            || info.column.id == "is_best" 
            || info.column.id == "is_actual") {
      return (<EditableSwitchCell {...attributes} />)
    } else if (info.column.id == "dateAt") {
      return (<EditableDateCell {...attributes} />)
    } else {
      return <EditableCell {...attributes}  />
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
      // save
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
  <div className="table-responsive">
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
    </div>
    </>
  );
}
