import "date-fns";
import api from "../../api";
import React, { FormEvent } from "react";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import SaveIcon from "@material-ui/icons/Save";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Developer } from "../../types/Developer";
import { Input } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

type ModalDeveloperProps = {
  developer?: Developer;
  idEdit?: boolean;
};

export default function ModalDeveloper(props: ModalDeveloperProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("1990-01-01T21:11:54")
  );

  const classes = useStyles();

  const [gender, setGender] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [hobby, setHobby] = React.useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await api.post("/developers", {
      name: name,
      email: email,
      hobby: hobby,
      sex: gender,
      birthDate: selectedDate,
    });
    alert("Foiiiii");
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form onSubmit={handleSubmit}>
        <label>Nome Completo</label>
        <Input
          id="name-complete"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          fullWidth
        />
        <label>Email</label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          fullWidth
        />
        <label>Hobby</label>
        <TextField
          id="standard-multiline-flexible"
          multiline
          fullWidth
          maxRows={4}
          value={hobby}
          onChange={(event) => {
            setHobby(event.target.value);
          }}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Data de aniversário"
          value={selectedDate}
          onChange={(event) => {
            setSelectedDate(event);
          }}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Gênero</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gender}
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
      </form>
    </MuiPickersUtilsProvider>
  );
}
