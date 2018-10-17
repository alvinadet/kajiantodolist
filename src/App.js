import React, { Component } from 'react';

class App extends Component {
  state = {
    database: [],
    data: ''
  };
  handleChange = e => {
    this.setState({
      data: e.target.value
    });
  };

  getDatabase = () => {
    const getTodo = JSON.parse(localStorage.getItem('todo'));
    if (getTodo != null) {
      return this.setState({
        database: getTodo
      });
    } else {
    }
  };

  addData = () => {
    const database = this.state.database;
    const data = this.state.data;
    database.push(data);
    localStorage.setItem('todo', JSON.stringify(database));

    this.setState({
      data: ''
    });
  };
  deleteData = id => {
    const database = this.state.database;
    database.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(database));
    this.getDatabase();
  };

  componentDidMount() {
    this.getDatabase();
  }

  render() {
    return (
      <div>
        <input value={this.state.data} onChange={this.handleChange} />
        <button onClick={() => this.addData()}>Tambah</button>
        <ul>
          {this.state.database.map((datum, id) => {
            return (
              <div>
                <li key={id}>{datum}</li>
                <button onClick={() => this.deleteData(id)}>Hapus</button>
                <button onClick={() => this.getEdit(id)}>Edit</button>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default App;
