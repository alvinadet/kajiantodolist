import React, { Component } from 'react';
import './style.css';
import './App.css';
import { connect } from 'react-redux';
import { addData, deleteData } from './redux/actions/Action';
//classfull component  > Statefull component

class App extends Component {
  //menampung variabel
  state = {
    database: [],
    data: '',
    tombol: false,
    id: 0,
    nama: '',
    isEdit: false,
    waktu: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };

  //Mendapatkan Data di Local Storage
  getDatabase = () => {
    const getTodo = JSON.parse(localStorage.getItem('todo'));
    if (getTodo != null) {
      return this.setState({
        database: getTodo
      });
    } else {
    }
  };

  //Menambah Data ke Local Storage
  // addData = () => {
  //   const database = this.state.database;
  //   const data = this.state.data;
  //   database.push(data);
  //   localStorage.setItem('todo', JSON.stringify(database));

  //   this.setState({
  //     nama: ''
  //   });
  // };

  //Menghapus Data
  // deleteData = id => {
  //   const database = this.state.database;
  //   database.splice(id, 1);
  //   localStorage.setItem('todo', JSON.stringify(database));
  //   this.getDatabase();
  // };

  //Mendapatkan Data
  getEdit = index => {
    const database = this.state.database;
    const getData = database[index];
    this.setState({
      data: getData,
      tombol: true,
      id: index
    });
  };

  //Mengedit Data
  edit = id => {
    const database = this.state.database;
    const data = this.state.data;
    database.splice(id, 1, data);
    localStorage.setItem('todo', JSON.stringify(database));
    this.setState({
      data: '',
      tombol: false
    });
    this.getDatabase();
  };

  handlePressKey = e => {
    if (e.key === 'Enter') {
      localStorage.setItem('nama', this.state.nama);
      this.setState({
        isEdit: true
      });
    }
  };

  componentDidMount() {
    let date = new Date();
    let time = `${date.getHours()}:${date.getMinutes()}`;
    this.getDatabase();
    this.setState({
      waktu: time
    });
    console.log(this.props.todos);
  }

  addHandler = async () => {
    const data = this.state.nama;
    this.props.addData(data);
    console.log(this.props.todos);
  };

  render() {
    const todos = this.props.todos;
    let namaKita = localStorage.getItem('nama');
    return (
      <div className="App-header" style={{ textAlign: 'center' }}>
        <h1>{this.state.waktu}</h1>
        {this.state.isEdit ? (
          <div>
            <h3>Good Afternoon , {namaKita}</h3>
            <p>What's your focus today?</p>
            <input
              type="text"
              name="nama"
              value={this.state.nama}
              onChange={this.handleChange}
            />
            <button onClick={() => this.addHandler()}>Tambah</button>
          </div>
        ) : (
          <div>
            <p>Tell me your name please</p>
            <input
              type="text"
              name="nama"
              value={this.state.nama}
              onChange={this.handleChange}
              onKeyPress={this.handlePressKey}
            />
          </div>
        )}

        {todos.map((datum, key) => {
          return (
            <div>
              <p>{datum}</p>
              <button onClick={() => this.props.deleteData(key)}>Hapus</button>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};

export default connect(
  mapStateToProps,
  { addData, deleteData }
)(App);
