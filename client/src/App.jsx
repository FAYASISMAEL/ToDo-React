import React, { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'

function App() {

  const [input, setInput] = useState("")
  const [edittask, setEdit] = useState(false)
  const [editid, setEditid] = useState("")
  const [data, setData] = useState([])
  const [reload, setReload] = useState(true)


  useEffect(() => {
    loadData()
  }, [reload])

  async function loadData() {
    const res = await axios.get("http://localhost:3000/api/todo/gettasks")
    await setData(res.data)
  }

  function listChecked(id) {
    console.log(id);
    console.log("List checked");

  }

  async function changeStatus(id) {
    console.log("status changed")
    const res = axios.get(`http://localhost:3000/api/todo/checked/${id}`)
    setReload(reload === true ? false : true)
  }

  async function edit(index) {
    setEdit(true)
    setInput(data[index].task)
    setEditid(data[index]._id)
  }

  async function del(id) {
    const res = await axios.get(`http://localhost:3000/api/todo/deletetask/${id}`)
    console.log(res)
    setReload(reload === true ? false : true)
  }


  const sendData = async () => {

      const task = input

      if(edittask===true){
      const id = editid
      const res = await axios.post(`http://localhost:3000/api/todo/edittask/${id}`, { task })
        setEditid("")
        setEdit(false)
        setInput("")
      setReload(reload === true ? false : true)

    }else{
      const res = await axios.post("http://localhost:3000/api/todo/addtask", { task })
      console.log(res)
      setInput("")
      setReload(reload === true ? false : true)
    }
  }
  return (
    <div className='container'>
      <div className="wrap">
        <div className="submitarea">
          <input type="text" name="task" id="task" value={input} onChange={(e)=>setInput(e.target.value)} />
          <button onClick={sendData}>{ edittask==true? "Save Task" : "Add Task" }</button>
        </div>
      </div>
      <div className="display">
        {
          data.map((todo, index) => (
            <div className="tasks" key={todo._id}>
              <input type="checkbox" checked={todo.status}  name="check" id="check" onChange={()=>changeStatus(todo._id)} />
              <span className={todo.status ? "completed" : ""}>
                {todo.task}
              </span>

              {/* <span>{todo.date}</span> */}
              <div className="buttons">
                <button onClick={() => edit(index)} className="edbtn">Edit</button>
                <button onClick={() => del(todo._id)} className="dlbtn">Delete</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
