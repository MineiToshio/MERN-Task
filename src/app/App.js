import React, { Component } from "react";

class App extends Component {

  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      _id: "",
      tasks: []
    }
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addTask(e) {
    if(this.state._id) {
      fetch(`/api/tasks/${this.state._id}`, {
        method: "PUT",
        body: JSON.stringify(this.state),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(data => {
        M.toast({ html: "Task Updated" });
        this.setState({
          title: "",
          description: "",
          _id: "",
        })
        this.fetchTasks();
      })
    }
    else {
      fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(data => {
        M.toast({ html: "Task Saved" });
        this.setState({
          title: "",
          description: ""
        })
        this.fetchTasks();
      })
      .catch(err => console.error(err));
    }

    e.preventDefault();
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch("/api/tasks")
    .then(res => res.json())
    .then(data => {
      this.setState({
        tasks: data
      })
    });
  }

  deleteTask(id) {
    if(confirm("Are you sure you want to delete the task"))
    {
      fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        M.toast({html: "Task Deleted"});
        this.fetchTasks();
      });
    }
  }

  editTask(id) {
    fetch(`/api/tasks/${id}`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        title: data.title,
        description: data.description,
        _id: data._id
      })
    })
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        {/* NAVAGATION */}
        <nav className="light-blue darken-4">
          <div className="container">
            <a className="brand-logo" href="">MERN Tasks</a>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="title" value={this.state.title} onChange={this.handleChange} type="text" placeholder="Task Title"/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="description" value={this.state.description} onChange={this.handleChange} placeholder="Task Description" className="materialize-textarea"></textarea>
                      </div>
                    </div>
                    <button className="btn light-blue darken-4" type="submit">
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.tasks.map(task => {
                      return (
                        <tr key={task._id}>
                          <td>{task.title}</td>
                          <td>{task.description}</td>
                          <td>
                            <button onClick={() => this.deleteTask(task._id)} className="btn light-blue darken-4">
                              <i className="material-icons">delete</i>
                            </button>
                            <button onClick={() => this.editTask(task._id)} style={{margin: "4px"}} className="btn light-blue darken-4">
                              <i className="material-icons">edit</i>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;