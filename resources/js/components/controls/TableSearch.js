import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import { Link } from 'react-router-dom';
import Degree from './Degree';

export default function TableSearch({ setGlobalFilter }) {
    const [filterInput, setFilterInput] = useState("");

    // Update the state when input changes
    const handleFilterChange = e => {
        const {value} = e.currentTarget; // e.target.value || undefined;
        setGlobalFilter(value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
        setFilterInput(value);
    };

    return(
        <input
            className='table-filter-search'
            value={filterInput}
            onChange={handleFilterChange}
            placeholder={"Пошук (по всім полям)"}
            style={{border: '0'}}
        />
    )
}
