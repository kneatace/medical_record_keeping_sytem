import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import PieChartIcon from '@mui/icons-material/PieChart';

const Statistics = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom component="div">
        <ShowChartIcon /> Chart
      </Typography>
      <Typography variant="h4" gutterBottom component="div">
        <LineStyleIcon /> Line Graph
      </Typography>
      <Typography variant="h4" gutterBottom component="div">
        <PieChartIcon /> Pie Chart
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Column 1</TableCell>
              <TableCell>Column 2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Cell 1</TableCell>
              <TableCell>Cell 2</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cell 3</TableCell>
              <TableCell>Cell 4</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cell 5</TableCell>
              <TableCell>Cell 6</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Statistics;