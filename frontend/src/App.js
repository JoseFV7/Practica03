import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state =({
      prestamos:[],
      pos:null,
      titulo:'Nuevo Registro',
      id:0,
      biblioteca:'',
      libro:'',
      lector:'',
      fecha_prestamo:'',
      fecha_devolucion:'',
    })
    this.cambioBiblioteca = this.cambioBiblioteca.bind(this);
    this.cambioLibro = this.cambioLibro.bind(this);
    this.cambioLector = this.cambioLector.bind(this);
    this.cambioFecha_prestamo = this.cambioFecha_prestamo.bind(this);
    this.cambioFecha_devolucion = this.cambioFecha_devolucion.bind(this);
    this.mostrar = this.mostrar.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.guardar = this.guardar.bind(this);
  }

  componentDidMount(){
    axios.get('http://127.0.0.1:8000/prestamos/')
    .then(res=> {
      this.setState({prestamos:res.data})
    })
  }

  cambioBiblioteca(e){
    this.setState({
      biblioteca : e.target.value
    })
  }

  cambioLibro(e){
    this.setState({
      libro : e.target.value
    })
  }

  cambioLector(e){
    this.setState({
      lector : e.target.value
    })
  }

  cambioFecha_prestamo(e){
    this.setState({
      fecha_prestamo : e.target.value
    })
  }

  cambioFecha_devolucion(e){
    this.setState({
      fecha_devolucion : e.target.value
    })
  }


  mostrar(cod,index){
    axios.get('http://127.0.0.1:8000/prestamos/'+cod)
    .then(res => {
      this.setState({
        pos: index,
        titulo: 'Editar',
        id: res.data.id,
        biblioteca :res.data.biblioteca,
        libro :res.data.libro,
        lector :res.data.lector,
        fecha_prestamo: res.data.fecha_prestamo,
        fecha_devolucion: res.data.fecha_devolucion,
      })
    })
  }

  guardar(e){
    e.preventDefault();
    let cod = this.state.id;
    const datos = {
      biblioteca: this.state.biblioteca,
      libro: this.state.libro,
      lector: this.state.lector,
      fecha_prestamo: this.state.fecha_prestamo,
      fecha_devolucion: this.state.fecha_devolucion
    }
    if(cod>0){
      //edición de un registro
      axios.put('http://127.0.0.1:8000/prestamos/'+cod,datos)
      .then(res =>{
        let indx = this.state.pos;
        this.state.prestamos[indx] = res.data;
        var temp = this.state.prestamos;
        this.setState({
          pos:null,
          titulo:'Nuevo',
          id:0,
          biblioteca:'',
          libro:'',
          lector:'',
          fecha_prestamo:'',
          fecha_devolucion:'',
          prestamos: temp
        });
      }).catch((error) =>{
        console.log(error.toString());
      });
    }else{
      //nuevo registro
      axios.post('http://127.0.0.1:8000/prestamos/',datos)
      .then(res => {
        this.state.prestamos.push(res.data);
        var temp = this.state.prestamos;
        this.setState({
          id:0,
          biblioteca:'',
          libro:'',
          lector:'',
          fecha_prestamo:'',
          fecha_devolucion:'',
          prestamos: temp
        });
      }).catch((error)=>{
        console.log(error.toString());
      });
    }
  }


  eliminar(cod){
    let rpta = window.confirm("Desea Eliminar?");
    if(rpta){
      axios.delete('http://127.0.0.1:8000/prestamos/'+cod)
      .then(res =>{
        var temp = this.state.prestamos.filter((prestamo)=>prestamo.id !== cod);
        this.setState({
          prestamos: temp
        })
      })
    }
  }


  render() {
    return (
    <div>
      <Container>
          <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Biblioteca</th>
              <th>Libro</th>
              <th>Lector</th>
              <th>Fecha prestamo</th>
              <th>Fecha devolucion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.prestamos.map((prestamo,index) =>{
              return (
                <tr key={prestamo.id}>
                  <td>{prestamo.biblioteca}</td>
                  <td>{prestamo.libro}</td>
                  <td>{prestamo.lector}</td>
                  <td>{prestamo.fecha_prestamo}</td>
                  <td>{prestamo.fecha_devolucion}</td>
                  <td>
                  <Button variant="success" onClick={()=>this.mostrar(prestamo.id,index)}>Editar</Button>
                  <Button variant="danger" onClick={()=>this.eliminar(prestamo.id,index)}>Eliminar</Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <hr />
        <h1>{this.state.titulo}</h1>
        <Form onSubmit={this.guardar}>
            <input type="hidden" value={this.state.id} />
            <Form.Group className="mb-3">
              <Form.Label>Biblioteca</Form.Label>
              <Form.Control type="text" value={this.state.biblioteca} onChange={this.cambioBiblioteca} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Libro</Form.Label>
              <Form.Control type="text" value={this.state.libro} onChange={this.cambioLibro} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Lector</Form.Label>
              <Form.Control type="text" value={this.state.lector} onChange={this.cambioLector} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha prestamo</Form.Label>
              <Form.Control type="date" value={this.state.fecha_prestamo} onChange={this.cambioFecha_prestamo} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha devolucion</Form.Label>
              <Form.Control type="date" value={this.state.fecha_devolucion} onChange={this.cambioFecha_devolucion} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
        </Form>
      </Container>
    </div>)
  }
}

export default App;
