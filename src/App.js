import React from "react";
import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

function reducer(state, action) {
  if (action.type === "ADD_TASK") {
    return [
      ...state,
      {
        id: state.length + 1,
        text: action.text,
        complited: action.complited,
      },
    ];
  }
  if (action.type === "DEL_TASK") {
    return state.filter((item) => item.id !== action.payload);
  }
  return state;
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, []);
  const [input, setInput] = React.useState("");
  const [check, setCheck] = React.useState(false);

  const addTask = () => {
    dispatch({
      type: "ADD_TASK",
      text: input,
      complited: check,
    });
    setInput("");
    setCheck(false);
  };

  const delTask = (id) => {
    const res = window.confirm(`Are you sure delete task id${id}?`);
    if (res === true) {
      dispatch({
        type: "DEL_TASK",
        payload: id,
      });
    }
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField
          input={input}
          setInput={setInput}
          check={check}
          setCheck={setCheck}
          handelAddTask={addTask}
        />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.length ? (
            state.map((item) => (
              <Item key={item.id} item={item} delTask={delTask} />
            ))
          ) : (
            <h3 style={{ textAlign: "center" }}>Список задач пустой</h3>
          )}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
