import React from "react";
import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

function reducer(state, action) {
  console.log(state,action)
  if(action.type === 'ADD_TASK') {
    return [
      ...state,
      {
        id:state.length + 1,
        text:action.text,
        complited:action.complited
      }
    ]
  }
  return state;
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, []);
  const [input,setInput] = React.useState('')
  const [check,setCheck] = React.useState(false)

  const addTask = () => {
    dispatch({
      type: "ADD_TASK",
      text: input,
      complited: check,
    });
    setInput('')
    setCheck(false)
  };
  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField input={input} setInput={setInput}  check={check} setCheck={setCheck} handelAddTask={addTask} />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.length
            ? state.map((item) => (
                <Item
                  key={item.id}
                  text={item.text}
                  complited={item.complited}
                />
              ))
            : <h3 style={{textAlign:'center'}}>Список задач пустой</h3>}
          {/* <Item text="Задача №1" /> */}
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
