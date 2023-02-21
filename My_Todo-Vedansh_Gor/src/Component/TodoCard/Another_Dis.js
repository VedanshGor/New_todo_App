import React from "react";

function Another_dis(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder="Enter task description"
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default Another_dis;
