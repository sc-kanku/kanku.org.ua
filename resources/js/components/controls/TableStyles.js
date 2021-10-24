import styled from 'styled-components';

const TableStyles = styled.div`
  table {
    border-spacing: 0;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      white-space: nowrap;
      margin: 0;
      padding: 0.1rem 0.5rem;
      border-bottom: 1px solid #999999;
      border-right: 1px solid #999999;

      :last-child {
        border-right: 0;
      }
    }
  }

  .fa-sort-up,
  .fa-sort-down,
  .fa-sort {
    color: #999999;
  }

  th {
    :hover {
      .fa-sort-up,
      .fa-sort-down,
      .fa-sort {
          color: red;
      }
    }
  }

  input {
    font-size: 1rem;
    padding: 0;
    margin: 0;
    border: 0;
    background-color: inherit;
  }

  select {
    background-color: inherit;
    border: 1px solid gray;
  }

  .table th, table td {
    border-bottom: 1px solid #0ba9e7;
    border-right: 1px solid #0ba9e7;
  }

  .table {
    border: 1px solid #0ba9e7;
    border-top-width: 2px;
  }

  .table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(26, 135, 200, 0.09);
  }
  
  .table-hover tbody tr:hover {
    color: #0ba9e7;
    background-color: rgba(26, 135, 200, 0.2);
  }
`;


export default TableStyles;