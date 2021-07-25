import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useContext, ReactNode, useState } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import { ContextDeveloper } from "../../context/ContextDeveloper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  headerTable: {
    fontWeight: "bold",
  },
});

type TableDeveloperProps = {
  children: ReactNode;
};

export default function TableDeveloper(props: TableDeveloperProps) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const { search, setSearch } = useContext(ContextDeveloper);

  function handleChange(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
    setSearch(undefined, undefined, value);
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.headerTable}>Nome</TableCell>
            <TableCell className={classes.headerTable}>
              Data Aniversario
            </TableCell>
            <TableCell className={classes.headerTable}>Idade</TableCell>
            <TableCell className={classes.headerTable}>Sexo</TableCell>
            <TableCell className={classes.headerTable}>Hobby</TableCell>
            <TableCell className={classes.headerTable}>E-mail</TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>{props.children}</TableBody>
      </Table>
      <Typography style={{ marginLeft: "30px" }}>
        Total: {search.developers?.total}
      </Typography>
      <Pagination
        count={search.developers?.last_page}
        page={page}
        onChange={handleChange}
      />
    </TableContainer>
  );
}
