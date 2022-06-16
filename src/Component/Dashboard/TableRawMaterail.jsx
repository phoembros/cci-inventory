import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import './tableRawmaterail.scss';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('25/05/2022', '26/05/2022','Materail', '$1,200'),
  createData('25/05/2022', '26/05/2022','Materail', '$1,200'),
  createData('25/05/2022', '26/05/2022','Materail', '$1,200'),
  createData('25/05/2022', '26/05/2022','Materail', '$1,200'),
  createData('25/05/2022', '26/05/2022','Materail', '$1,200'),
];

export default function TableRawMaterail() {
  return (
    <TableContainer className="materail">
      <Table  sx={{ minWidth: 150 }} aria-label="caption table">
        {/* <caption>Capital</caption> */}
        <TableHead className="head-row">
          <TableRow className="head-title">
            <TableCell className="head-title">Start Date</TableCell>
            <TableCell align="right" className="head-title" >End Date</TableCell>
            <TableCell align="right" className="head-title" >Expense Type</TableCell>
            <TableCell align="right" className="head-title" >Expense</TableCell>
          </TableRow>
        </TableHead>

        <TableBody className="head-row">
          {rows.map((row, index) => (
            <TableRow  key={row.name}>
                <TableCell className="head-title"  component="th" scope="row">{row.name}</TableCell>
                <TableCell align="right" className="head-title">{row.calories}</TableCell>
                <TableCell align="right" className="head-title">{row.fat}</TableCell>
                <TableCell align="right" className="head-title">{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}