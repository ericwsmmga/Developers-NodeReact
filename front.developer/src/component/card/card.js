import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CustomPaginationActionsTable from "../table/CustomPaginationActionsTable";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: "1% 10% 1% 10%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <CustomPaginationActionsTable />
      </CardContent>
    </Card>
  );
}
