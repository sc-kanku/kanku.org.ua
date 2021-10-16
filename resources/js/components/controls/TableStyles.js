import styled from 'styled-components';

const TableStyles = styled.div`
  table {
    border-spacing: 0;
    border: 1px solid #999999;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }

      :hover {
        input {
          color: red;
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
  }

  .table-striped > tbody > tr:nth-of-type(2n+1) input {
      --bs-table-accent-bg: var(--bs-table-striped-bg);
      background-color: #eeeeee ;
  }
`;


export default TableStyles;