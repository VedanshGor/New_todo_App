import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./App.css";
// import data from './Utils/Dataset'
import TodoCard from "./Component/TodoCard/TodoCard";
import Description from "./Component/TodoCard/Description";
import Another_Dis from "./Component/TodoCard/Another_Dis";

function App() {
  const [toDos, setToDos] = useState([]); // need to ste array so that push funtion can work
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    let data = localStorage.getItem("data");
    if (data) {
      setToDos(JSON.parse(data));
    }
  }, []);

  //Handles the event when add btn is clicked
  const addHandler = () => {
    let newTodo = {
      //making a new todo object
      id: Math.random(),
      title: newTitle,
      color: "",
      isCompleted: false,
      isDeleted: false,
    };

    toDos.push(newTodo); //adding new object in state
    setToDos([...toDos]); // updating state
    setNewTitle(null);
    localStorage.setItem("data", JSON.stringify(toDos)); // Updating Local Storage with state
  };

  //Handles The Event when complete btn is clicked
  const completeHandler = (id) => {
    // let temp = toDos
    // temp.map((e)=>{
    //   if(e.id===id){
    //     e.isCompleted= true
    //   }
    // })
    // console.log(...temp)
    // setToDos([...temp])

    const todo = toDos.find((e) => e.id === id); // finds the element with id
    todo.isCompleted = true; // changes are made which are reflected automatically
    setToDos([...toDos]); //updating the current state
    localStorage.setItem("data", JSON.stringify(toDos)); //updating local storage with state
  };

  //Handles The Event when color is changed
  const UpdateColor = (id, color) => {
    // let temp = toDos
    // temp.map((e)=>{
    //   if(e.id===id){
    //     e.isCompleted= true
    //   }
    // })
    // console.log(...temp)
    // setToDos([...temp])

    const todo = toDos.find((e) => e.id === id); // finds the element with id
    todo.color = color; // changes are made which are reflected automatically
    setToDos([...toDos]); //updating the current state
    localStorage.setItem("data", JSON.stringify(toDos)); //updating local storage with state
  };

  //Hanldes the event when clicked on delete btn
  const deleteHandler = (id) => {
    // let temp = toDos
    // temp.map((e)=>{
    //   if(e.id===id){
    //     e.isCompleted= true
    //   }
    // })
    // console.log(...temp)
    // setToDos([...temp])

    const todo = toDos.find((e) => e.id === id); // Finds the element  by id
    todo.isDeleted = true; // Changes are made
    setToDos([...toDos]); // updating the state
    localStorage.setItem("data", JSON.stringify(toDos)); // Updating Local Storage with state
  };

  console.log(toDos);
  return (
    <div className="main-container">
      <div className="input-container">
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Enter Todo"
            value={newTitle || ""}
            variant="outlined"
            onChange={(data) => setNewTitle(data.target.value)}
          />
        </Box>
        <Button variant="contained" onClick={addHandler}>
          Add
        </Button>
        {/* <Description /> */}
      </div>
      <div className="output-container">
        <div className="card-container">
          <h4>Pending</h4>
          <div className="card-list">
            {toDos?.map((e) => {
              if (!e.isCompleted) {
                //checking if the element is completed or not
                return (
                  <div>
                    {!e.isDeleted && ( // checking if the element is deleted or not
                      <TodoCard
                        key={e.id}
                        title={e.title}
                        id={e.id}
                        complete={completeHandler}
                        updateColor={UpdateColor}
                        color={e.color}
                        isCompleted={e.isCompleted}
                        delete={deleteHandler}
                      />
                    )}
                  </div>
                );
              } else {
                return <></>;
              }
            })}
          </div>
        </div>
        <div className="card-container">
          <h4>Completed</h4>
          <div className="card-list">
            {toDos?.map((e) => {
              if (e.isCompleted) {
                return (
                  !e.isDeleted && (
                    <TodoCard
                      key={e.id}
                      id={e.id}
                      title={e.title}
                      isCompleted={e.isCompleted}
                      delete={deleteHandler}
                      updateColor={UpdateColor}
                      color={e.color}
                    />
                  )
                );
              } else {
                return <></>;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
