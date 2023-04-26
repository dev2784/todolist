import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom/dist";
import Layout from "../Layout/Layout";
import TopBar from "../TopBar/TopBar";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import styled from "@emotion/styled";
import { List, LockClock } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, edit } from "../../listReducer";
import AlertBox from "../Alert/Alert";
import { createSelector } from "@reduxjs/toolkit";

const TodoCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryParam = useParams();

  const selectTodo = createSelector(
    (state) => state.listing,
    (_, id) => id,
    (listing, id) => listing.list.filter((todo) => todo.id === id)
  );

  const data = useSelector((state) => selectTodo(state, queryParam?.id));

  console.log(data);
  const [todo, setTodo] = useState(data.length ? data[0].todo : "");
  const [time, setTime] = useState(data.length ? data[0].time : "");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("alert");

  const submit = () => {
    if (queryParam.id) {
      if (todo === "") {
        setOpen(true);
        setMessage("please fill todo");
        setSeverity("warning");
      } else if (time === "") {
        setOpen(true);
        setMessage("please fill time");
        setSeverity("warning");
      } else {
        dispatch(
          edit({
            id: queryParam.id,
            todo: todo,
            time: time,
            status: "pending",
          })
        );
        setOpen(true);
        setMessage("Data updated successfully");
        setSeverity("success");
      }
    } else {
      if (todo === "") {
        setOpen(true);
        setMessage("please fill todo");
        setSeverity("warning");
      } else if (time === "") {
        setOpen(true);
        setMessage("please fill time");
        setSeverity("warning");
      } else {
        dispatch(
          add({
            id: Math.random().toString(16).slice(2),
            todo: todo,
            time: time,
            status: "pending",
          })
        );
        setOpen(true);
        setMessage("Data saved successfully");
        setSeverity("success");
        setTodo("");
        setTime("");
      }
    }
  };

  const StyledSpace = styled("div")(({ theme }) => ({
    flexGrow: 1,
    alignSelf: "center",
  }));
  return (
    <Layout>
      <TopBar>
        <Button
          variant="contained"
          startIcon={<ArrowBackIos />}
          onClick={() => navigate("/")}
        >
          List
        </Button>
        <StyledSpace />
        <Typography sx={{ fontSize: 20 }} gutterBottom>
          Add New Todo
        </Typography>
      </TopBar>
      <Card>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <AlertBox
                severity={severity}
                open={open}
                setOpen={setOpen}
                message={message}
              />
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="todo">Todo</InputLabel>
                <Input
                  id="todo"
                  startAdornment={
                    <InputAdornment position="start">
                      <List />
                    </InputAdornment>
                  }
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="time">Time</InputLabel>
                <Input
                  type="time"
                  id="time"
                  startAdornment={
                    <InputAdornment position="start">
                      <LockClock />
                    </InputAdornment>
                  }
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={() => submit()}>
            Submit
          </Button>
        </CardActions>
      </Card>
    </Layout>
  );
};
export default TodoCreate;
