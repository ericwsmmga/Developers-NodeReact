import api from "../../api";
import Fade from "@material-ui/core/Fade";
import Card from "@material-ui/core/Card";
import Modal from "@material-ui/core/Modal";
import DateFnsUtils from "@date-io/date-fns";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import Backdrop from "@material-ui/core/Backdrop";
import MenuItem from "@material-ui/core/MenuItem";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import TableCell from "@material-ui/core/TableCell";
import TableDeveloper from "../table/TableDeveloper";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import React, { useContext, FormEvent, useEffect } from "react";
import { ContextDeveloper } from "../../context/ContextDeveloper";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const modalStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif",
      padding: "100px",
    },
    root: {
      minWidth: 275,
    },
    addButton: { margin: "0px 5px 18px 16px" },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    form: {
      padding: "0 10px 0 10px",
    },
    button: {
      margin: theme.spacing(1),
    },
    separator: {
      display: "flex",
      alignContent: "center",
      justifyContent: "center ",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "none",
      borderRadius: "16px",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

export default function CardDeveloper() {
  const classes = modalStyles();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [hobby, setHobby] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [gender, setGender] = React.useState("");
  const { search, setSearch } = useContext(ContextDeveloper);
  const [idDeveloper, setIdDeveloper] = React.useState<number>(0);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    setSearch();
  }, []);

  function handleClose() {
    setOpen(false);
    setSearch();
    setName("");
    setEmail("");
    setHobby("");
    setGender("");
    setSelectedDate(null);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      await api.post("/developers", {
        name: name,
        email: email,
        hobby: hobby,
        sex: gender,
        birthDate: selectedDate,
      });
      alert("Desenvolvedor Adicionado!");
      setSearch();
      handleClose();
    } catch (error) {
      alert("E-mail já cadastrado !");
    }
  }
  async function handleUpdate(event: FormEvent) {
    event.preventDefault();
    try {
      await api
        .put(`/developers/${idDeveloper}`, {
          name: name,
          email: email,
          hobby: hobby,
          sex: gender,
          birthDate: selectedDate,
        })
        .then(() => alert("Desenvolvedor Atualizado !"));
      setIdDeveloper(0);
      setSearch();
      handleClose();
    } catch (error) {
      alert("E-mail já cadastrado !");
    }
  }
  async function DeleteDeveloper(id: number) {
    if (window.confirm("Deseja exluir ?")) {
      await api
        .delete(`/developers/${id}`)
        .then(() => alert("Excluído com Sucesso!"));
      setSearch();
    }
  }
  async function UpdateDeveloper(id: number) {
    setIdDeveloper(id);
    const developer = await api.get(`/developers/${id}`);
    handleOpen();
    setName(developer.data.name);
    setEmail(developer.data.email);
    setHobby(developer.data.hobby);
    setGender(developer.data.sex);
    setSelectedDate(developer.data.birthDate);
  }
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
                  <TableCell>{dev.birthDate}</TableCell>
                  <TableCell>{dev.age}</TableCell>
                  <TableCell>{dev.sex}</TableCell>
                  <TableCell>{dev.hobby}</TableCell>
                  <TableCell>{dev.email}</TableCell>
                  <TableCell width="20">
                    <IconButton onClick={() => DeleteDeveloper(dev.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right" width="20">
                    <IconButton
                      onClick={() => UpdateDeveloper(dev.id)}
                      aria-label="edit"
                    >
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
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h1 id="transition-modal-title">
                {idDeveloper === 0 ? "Novo" : "Editar"} Desenvolvedor
              </h1>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <form
                  onSubmit={idDeveloper === 0 ? handleSubmit : handleUpdate}
                  className={classes.form}
                >
                  <TextField
                    required
                    id="name-complete"
                    value={name}
                    label="Nome Completo"
                    fullWidth
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                  <TextField
                    id="email"
                    label="E-mail"
                    type="email"
                    value={email}
                    required
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    fullWidth
                  />
                  <TextField
                    id="standard-multiline-flexible"
                    multiline
                    required
                    fullWidth
                    label="Hobby"
                    maxRows={2}
                    value={hobby}
                    onChange={(event) => {
                      setHobby(event.target.value);
                    }}
                  />
                  <div className={classes.separator}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Data de aniversário"
                      value={selectedDate}
                      required
                      style={{ maxWidth: "36%" }}
                      onChange={(event) => {
                        setSelectedDate(event);
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                    <FormControl
                      style={{ marginTop: "2.5%" }}
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Gênero
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gender}
                        required
                        onChange={(event) => {
                          setGender(event.target.value as string);
                        }}
                      >
                        <MenuItem value={"F"}>Feminino</MenuItem>
                        <MenuItem value={"M"}>Masculino</MenuItem>
                        <MenuItem value={"NB"}>Não Binário</MenuItem>
                        <MenuItem value={"O"}>Outros</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className={classes.separator}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                      type="submit"
                    >
                      Salvar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      startIcon={<CloseIcon />}
                      onClick={handleClose}
                    >
                      Fechar
                    </Button>
                  </div>
                </form>
              </MuiPickersUtilsProvider>
            </div>
          </Fade>
        </Modal>
      </div>
    </Card>
  );
}
