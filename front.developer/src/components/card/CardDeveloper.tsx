import React, { useContext, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TableDeveloper from "../table/TableDeveloper";
import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import api from "../../api";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import IconButton from "@material-ui/core/IconButton";
import Fade from "@material-ui/core/Fade";

import TableCell from "@material-ui/core/TableCell";

import TableRow from "@material-ui/core/TableRow";
import ModalDeveloper from "../developer/ModalDeveloper";

import { ContextDeveloper } from "../../context/ContextDeveloper";

import Button from "@material-ui/core/Button";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  addButton: { margin: "0px 5px 18px 16px" },
});

const modalStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      margin: theme.spacing(1),
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

export default function CardDeveloper() {
  const { search, setSearch } = useContext(ContextDeveloper);
  const classes = useStyles();
  const classe = modalStyles();
  const [open, setOpen] = React.useState(false);

  async function DeleteDeveloper(id: number) {
    await api.delete(`/developers/${id}`).then(() => alert("Sucesso"));
    setSearch();
  }
  useEffect(() => {
    setSearch();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card className={classes.root}>
      <CardContent>
        <TableDeveloper>
          {search &&
            search.developers?.data?.map((dev) => {
              return (
                <TableRow key={dev.id}>
                  <TableCell component="th" scope="row">
                    {dev.name}
                  </TableCell>
                  <TableCell align="right">{dev.hobby}</TableCell>
                  <TableCell align="right">{dev.sex}</TableCell>
                  <TableCell align="right">{dev.age}</TableCell>
                  <TableCell align="right">{dev.birthDate}</TableCell>
                  <TableCell align="right" width="20">
                    <IconButton onClick={() => DeleteDeveloper(dev.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right" width="20">
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableDeveloper>
      </CardContent>
      <div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.addButton}
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Adicionar
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classe.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classe.paper}>
              <h1 id="transition-modal-title">Novo Desenvolvedor</h1>
              <ModalDeveloper />
            </div>
          </Fade>
        </Modal>
      </div>
    </Card>
  );
}
