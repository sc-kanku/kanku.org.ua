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

  input:not([role='switch']) {
    font-size: 1rem;
    padding: 0 0 0 0.3em;
    margin: 0;
    border: 0;
    background-color: inherit;
    width: 100%;
  }

  .form-check-input:checked {
    background-color: #0cc80f;
  }

  input[role=switch] {
    border: 2px solid #999999;
  }

  form input:not([role='switch']) {
    border: 1px solid #999999;
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

  form #brief {
    color: inherit;
    font-weight: inherit;
  }

  .form-label {
    margin-bottom: 0.3em;
    color: #012372;
    font-weight: 700;
    font-size: 0.9em;
  }

  input[type='file'] {
    border: 0 !important;
    // display: none;
  }

  .custom-file-upload {/*
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;*/
    position: absolute;
    z-index: 1000;
    background-color: white;
    border: 1px solid;
}

.custom-file-upload:hover {
  background-color: green;
}

`;


export default TableStyles;
