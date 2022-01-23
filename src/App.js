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

  if (action.type === "TOGGLE_CHECKBOX") {
    return state.map((item) => {
      if (item.id === action.payload) {
        return {
          ...item,
          complited: !item.complited,
        };
      }
      return item;
    });
  }
  // удаляем все элементы из стейта
  if (action.type === "DELETE_ALL_TASKS") {
    return [];
  }
  // переключаем все чекбоксы в true
  if (action.type === "TOGGLE_ALL_CHECKBOX") {
    return state.map((obj) => {
      if (obj.complited === false) {
        return {
          ...obj,
          complited: !obj.complited,
        };
      }
      return obj;
    });
  }
  // переключаем все чекбоксы в false
  if (action.type === "ALL_CHECKBOX_CLER") {
    return state.map((obj) => {
      if (obj.complited === true) {
        return {
          ...obj,
          complited: !obj.complited,
        };
      }
      return obj;
    });
  }

  return state;
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, []);
  const [input, setInput] = React.useState("");
  const [check, setCheck] = React.useState(false);
  const [checkAll, setCheckAll] = React.useState(false);

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
    if (res) {
      dispatch({
        type: "DEL_TASK",
        payload: id,
      });
    }
  };

  const toggleComplited = (id) => {
    dispatch({
      type: "TOGGLE_CHECKBOX",
      payload: id,
    });
  };

  const deleteAllTask = () => {
    if (window.confirm("Удалить все задачи")) {
      dispatch({
        type: "DELETE_ALL_TASKS",
      });
    }
  };

  const toggleComplitedAll = () => {
    dispatch({
      type: "TOGGLE_ALL_CHECKBOX",
    });
    setCheckAll(true);
  };

  const toggleCheckboxAllCler = () => {
    dispatch({
      type: "ALL_CHECKBOX_CLER",
    });
    setCheckAll(false);
  };

  // реализация переключения табов

  const [tab, setTab] = React.useState("Все");
  const [tabActive, setTabActive] = React.useState(0);
  const [filterTask, setFilterTask] = React.useState([]);
  // для табов

  // рендер кнопок
  const tabs = [
    { label: "Все" },
    { label: "Активные" },
    { label: "Завершённые" },
  ];

  React.useEffect(() => {
    if (tab === "Все") {
      setFilterTask(state);
      setTabActive(0);
    }
    if (tab === "Активные") {
      setTabActive(1);
      setFilterTask(state.filter((item) => item.complited === false));
    }
    if (tab === "Завершённые") {
      setTabActive(2);
      setFilterTask(state.filter((item) => item.complited === true));
    }
  }, [tab, state, filterTask]);
  // для табов

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
        <Tabs value={tabActive}>
          {tabs.map((tab, i) => (
            <Tab onClick={() => setTab(tab.label)} key={i} label={tab.label} />
          ))}
        </Tabs>
        <Divider />
        <List>
          {filterTask.length ? (
            filterTask.map((item) => (
              <Item
                key={item.id}
                item={item}
                delTask={delTask}
                toggleComplited={() => toggleComplited(item.id)}
              />
            ))
          ) : (
            <h3 style={{ textAlign: "center" }}>Список задач пустой</h3>
          )}
        </List>
        <Divider />
        <div className="check-buttons">
          {checkAll ? (
            <Button onClick={toggleCheckboxAllCler}>Снять отметки</Button>
          ) : (
            <Button onClick={toggleComplitedAll}>Отметить всё</Button>
          )}
          <Button onClick={deleteAllTask}>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
