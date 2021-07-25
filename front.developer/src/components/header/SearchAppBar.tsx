import { FormEvent } from "react";
import { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import { ContextDeveloper } from "../../context/ContextDeveloper";
import {
  createStyles,
  alpha,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: { margin: "0px !important" },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    addButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      flexDirection: "row",
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      pointerEvents: "auto",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);

export default function SearchAppBar() {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const { setSearch } = useContext(ContextDeveloper);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();
    setSearch("name", value);
  }
  async function clear() {
    setValue("");
    setSearch("", "");
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Desenvolvedores CRUD
          </Typography>
          <form onSubmit={handleSearch}>
            <div className={classes.search}>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={value}
                inputProps={{ "aria-label": "search" }}
                onChange={(event) => setValue(event.target.value)}
              />
              {value && (
                <Button className={classes.searchIcon} onClick={clear}>
                  <ClearIcon />
                </Button>
              )}
              <Button className={classes.searchIcon} type="submit">
                <SearchIcon />
              </Button>
            </div>
          </form>
        </Toolbar>
      </AppBar>
    </div>
  );
}
