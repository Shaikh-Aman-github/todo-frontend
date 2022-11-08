import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import '../App.css'


function Home() {
  const [id , setId] = useState('');
  const [item, setItem] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const navigate = useNavigate();


  const email = JSON.parse(localStorage.getItem('user'))
  function getList() {
    axios.get(`http://localhost:8000/api/users/${email}`, email)
    .then((res) => {
      const userData = res.data;
      const Todos = userData.items;
      const userid = userData.id;
      setId(userid)
      setTodos(Todos);
    });
  }

  useEffect(() => {
    getList();
  }, []);

  const AddItem = async (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:8000/api/items`, {
        item: item,
        id: id
      })
      .then((res) => {
        console.log("adding item", res);
        getList();
        setItem("");
      })
      .catch((err) => console.log(err));
    
  };

  function deleteItem(id) {
    axios
      .delete(`http://localhost:8000/api/items/${id}`)
      .then((res) => {
        console.log("Deleted item", res);
        getList();
      })
      .catch((err) => console.log(err));
  }

  const updateItem = async (id, item) => {
    const updatedItem = [...todos].map((todo) => {
      if (todo.id === id) {
        axios
          .put(`http://localhost:8000/api/items/${id}`, {
            item: editingText,
          })
          .then((res) => {
            console.log("updated item", res);
            getList();
          })
          .catch((err) => console.log(err));
      }
      return todo;
    });
    setTodos(updatedItem);
    setTodoEditing(null);
    setEditingText("");
  };

  function updateStatus(todo) {
    const data = { id: todo.id, status: !todo.status };
    axios.put(`http://localhost:8000/api/items/${data.id}`, data).then(() => {
      const newTodos = todos.map(t => {
        if(t.id === t.id) {
          t.status = !t.status;
        }
        return t;
      });
      setTodos([...newTodos]);
      getList();
    });
  }


  function logout(){
    localStorage.clear();
    navigate('/')
  }
  return (
    <div className="App">
      
    <button id="logout-btn" onClick={logout} title="logout">
        <i className="fa fa-power-off" aria-hidden="true"></i>
      </button> 

      <h1>Todo</h1>
      <div className="container">
        <form>
          {todoEditing ? (
            <input
              type="text"
              onChange={(e) => setEditingText(e.target.value)}
              value={editingText}   
              placeholder="Update Task"
            />
          ) : (
            <>
              <input
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                placeholder="Enter Task"
              />

              <button onClick={AddItem} className="submit-btn">
                <i className="fa fa-plus" aria-hidden="true"></i>
              </button>
            </>
          )}
        </form>

        {todos
          ? todos.map((todo) => { 
              const { id, item} = todo;
              return (
                
                <div id="output" key={id}>
                  
                  <input className="my-checkbox"
                    type="checkbox"
                    checked={todo.status}
                    onClick={() => updateStatus(todo)}
                  />

                  {todo.status ? (
                    <h4 className="marked">{todo.item}</h4>
                  ) : (
                    <h4>{item}</h4>
                  )}

                  <div className="actions">
                    {todoEditing === todo.id ? (
                      <button
                        className="Updated-btn"
                        onClick={() => updateItem(todo.id)}
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        className="Update-btn"
                        onClick={() => setTodoEditing(todo.id)}
                      >
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </button>
                    )}

                    <button
                      className="Delete-btn"
                      onClick={() => deleteItem(todo.id)}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </div>

                </div>
              );
            })
          : "loding..."}
      </div>

    </div>
  );
}

export default Home;
