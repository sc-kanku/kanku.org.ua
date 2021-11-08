import React from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import Degree from './Degree';
import PostCategory from './PostCategory';
import TableSearch from './TableSearch';
import useEditable from '../utils/useEditable';

export const EditableDegree = ({ initialValue, className, ...props }) => {
  initialValue = initialValue != null ? initialValue : '';
  className = typeof className == 'undefined' ? '' : className;

  const [Editable, value, onChange] = useEditable({ 
    ...props,
    data: {id: props.id, field: props.field, value: initialValue},
    getNewValue: (e) => e.target.value
   });

  return <>
      <Editable />
      <Degree id={props.field} name={props.field} className={className}
        value={value} 
        editable="true" 
        onChange={onChange} 
      />
  </>
};

export const EditablePostCategory = ( { initialValue, className, ...props } ) => {
  initialValue = initialValue != null ? initialValue : '';
  className = typeof className == 'undefined' ? '' : className;

  const [Editable, value, onChange] = useEditable({ 
    ...props,
    data: {id: props.id, field: props.field, value: initialValue},
    getNewValue: (e) => e.target.value
  });

  return <>
      <Editable />
      <PostCategory value={value} editable="true" onChange={onChange} />
  </>
}; 

// Create an editable cell renderer
export const EditableDate = ({ initialValue, className, ...props }) => {
  // We need to keep and update the state of the cell normally
  initialValue = initialValue != null ? initialValue : '';
  className = typeof className == 'undefined' ? '' : className;

  const [Editable, value, onChange] = useEditable({ 
    ...props,
    data: {id: props.id, field: props.field, value: initialValue},
    getNewValue: (e) => e.target.value
  });
  // value={value}???
  return <>
    <Editable />
    <input 
      id={props.field} name={props.field} className={className}
      type='date' 
      defaultValue={initialValue} 
      onChange={onChange} 
    />
  </>
}

// Create an editable cell renderer
export const EditableSwitch = ({ initialValue, className, children, ...props }) => {
    // We need to keep and update the state of the cell normally
    initialValue = initialValue != null ? initialValue : "";
    className = typeof className == 'undefined' ? '' : className;
    children = typeof children == 'undefined' ? null : children;

    const [Editable, value, onChange] = useEditable({ 
        ...props, 
        data: {id: props.id, field: props.field, value: initialValue},
        getNewValue : (e) => e.target.checked ? 1 : 0 // 1 - value
      });

    let id = props.field + Math.round(Math.random() * 1000000);

    return <>
      <Editable />
      <div className="form-check form-switch">
        <input
          id={id} name={props.field} className={className}
          type='checkbox' role="switch"
          checked={value == 1}
          onChange={onChange} 
        />
        <label htmlFor={id} className="form-label">{children}</label>
      </div>
    </>
}

// Create an editable cell renderer
export const EditableText = ({ initialValue, type, className, disabled, ...props }) => {
    // We need to keep and update the state of the cell normally
    initialValue = initialValue != null ? initialValue : '';
    className = typeof className == 'undefined' ? '' : className;
    type = typeof type == 'undefined' ? 'text' : type;
    disabled = typeof disabled == 'undefined' ? false : disabled;

    const [Editable, value, onChange, setValue] = useEditable( { 
      ...props, 
      data: {id: props.id, field: props.field, value: initialValue},
      getNewValue : (e) => value
    });

  const onTypingChange = e => setValue(e.target.value)
  
  return <>
    <Editable />
    <input 
      id={props.field} name={props.field} className={className}
      type={type} 
      defaultValue={initialValue} 
      disabled={disabled} readOnly={disabled}
      onChange={onTypingChange} 
      onBlur={onChange} 
    />
  </>
}

export const EditableTextarea = ({ initialValue, type, className, rows, ...props }) => {
  // We need to keep and update the state of the cell normally
  initialValue = initialValue != null ? initialValue : '';
  className = typeof className == 'undefined' ? '' : className;
  rows = typeof rows == 'undefined' ? '5' : rows;

  const [Editable, value, onChange, setValue] = useEditable( { 
    ...props, 
    data: {id: props.id, field: props.field, value: initialValue},
    getNewValue : (e) => value
  });

const onTypingChange = e => setValue(e.target.value)

return <>
  <Editable />
  <textarea 
    id={props.field} name={props.field} className={className}
    rows={rows} 
    defaultValue={initialValue} 
    onChange={onTypingChange} 
    onBlur={onChange} 
  ></textarea>
</>
}

export default function Table({ columns, data, inlineUpdateUrl }) {
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  // data = { id, field, value }
  const synchronizeDataOnUpdateSuccess = (data) => {
    // rowIndex = data.id - 1, 
    // columnId = data.field
    // value = data.value
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

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: info => {
    let attributes = {
      id: info.row.values.id,
      field: info.column.id,
      initialValue: info.value,
      onBeforeSuccess: synchronizeDataOnUpdateSuccess,
      inlineUpdateUrl: inlineUpdateUrl
//      save: info.save
    }

    if (info.column.id == "degree") {
      return (<EditableDegree {...attributes} />)
    } else if (info.column.id == "category") {
      return (<EditablePostCategory {...attributes} />)
    } else if (info.column.id == "is_coach" 
            || info.column.id == "is_best" 
            || info.column.id == "is_actual") {
      return (<EditableSwitch {...attributes} className="form-check-input" />)
    } else if (info.column.id == "dateAt") {
      return (<EditableDate {...attributes} />)
    } else {
      return <EditableText {...attributes} />
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
