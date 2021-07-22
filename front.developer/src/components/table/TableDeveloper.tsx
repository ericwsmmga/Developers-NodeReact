import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";

import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import { ContextDeveloper } from "../../context/ContextDeveloper";
import { useEffect, useContext, ReactNode } from "react";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type TableDeveloperProps = {
  children: ReactNode;
};

export default function TableDeveloper(props: TableDeveloperProps) {
  const classes = useStyles();
  const { search, setSearch } = useContext(ContextDeveloper);

  function handleChange() {}

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>Desenvolvedores</TableCell>
            <TableCell align="right">Nome</TableCell>
            <TableCell align="right">Sexo</TableCell>
            <TableCell align="right">Idade</TableCell>
            <TableCell align="right">Hobby</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{props.children}</TableBody>
      </Table>
      <Typography>Total: {search.developers?.total}</Typography>
      <Pagination
        count={search.developers?.last_page}
        page={search.developers?.current_page}
        onChange={handleChange}
      />
    </TableContainer>
  );
}
