import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  tableCellClasses,
  TableBody,
  IconButton,
  Checkbox,
  ButtonGroup,
  Button,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Layout from "../Layout/Layout";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNote from "@mui/icons-material/EditNote";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom/dist";
import TopBar from "../TopBar/TopBar";
import { useSelector, useDispatch } from "react-redux";
import { remove, statusChange, completedRemove } from "../../listReducer";
import AlertBox from "../Alert/Alert";
import { useState } from "react";
import { createSelector } from "@reduxjs/toolkit";

const List = () => {
  const navigate = useNavigate();
  const selectCompletedTodos = createSelector(
    (state) => state.listing,
    (_, status) => status,
    (listing, status) => {
      if (status === "all") {
        return listing.list;
      } else {
        return listing.list.filter((todo) => todo.status === status);
      }
    }
  );

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("alert");
  const [status, setStatus] = useState("all");

  let list = useSelector((state) => selectCompletedTodos(state, status));

  const updateStatus = (e) => {
    dispatch(statusChange(e.target.id));
    setOpen(true);
    setMessage("Updated successfully");
    setSeverity("success");
  };

  const onDelete = (id) => {
    dispatch(remove(id));
    setOpen(true);
    setMessage("Removed successfully");
    setSeverity("success");
  };

  const RemoveCompleted = () => {
    dispatch(completedRemove());
    setOpen(true);
    setMessage("Removed successfully");
    setSeverity("success");
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const StyledSpace = styled("div")(({ theme }) => ({
    flexGrow: 1,
    alignSelf: "center",
  }));

  return (
    <Layout>
      <TopBar>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate("/create")}
        >
          Create
        </Button>
        <StyledSpace />
        <Button
          variant="contained"
          color={"error"}
          startIcon={<DeleteIcon />}
          onClick={() => RemoveCompleted()}
        >
          Remove Completed
        </Button>
        <StyledSpace />
        <ButtonGroup aria-label="Filter">
          <Button
            variant={status === "all" ? "contained" : "outline"}
            onClick={() => setStatus("all")}
          >
            All
          </Button>
          <Button
            variant={status === "completed" ? "contained" : "outline"}
            onClick={() => setStatus("completed")}
          >
            Completed
          </Button>
          <Button
            variant={status === "pending" ? "contained" : "outline"}
            onClick={() => setStatus("pending")}
          >
            Pending
          </Button>
        </ButtonGroup>
      </TopBar>
      <AlertBox
        severity={severity}
        open={open}
        setOpen={setOpen}
        message={message}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Check</StyledTableCell>
              <StyledTableCell align="left">Todo</StyledTableCell>
              <StyledTableCell align="left">Time</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item) => {
              return (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    <Checkbox
                      id={item.id}
                      checked={item.status === "pending" ? false : true}
                      onChange={(e) => updateStatus(e)}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">{item.todo}</StyledTableCell>
                  <StyledTableCell align="left">{item.time}</StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    <Chip
                      label={item.status === "pending" ? "Pending" : "Complete"}
                      color={item.status === "pending" ? "error" : "success"}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      disabled={item.status === "completed"}
                      aria-label="edit"
                      color="primary"
                      onClick={() => navigate(`/create/${item.id}`)}
                    >
                      <EditNote />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => onDelete(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};
export default List;
