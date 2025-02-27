import { useEffect, useState, useRef } from "react";
import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import api from '../../services/api'



function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()
  
  const getUsers = async() =>{
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)

  }

  const createUsers = async() =>{
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })

    getUsers()

  }

  const deleteUsers = async(id) =>{
    await api.delete(`/usuarios/${id}`)
    
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="container">
      <form>
        <h1>Cadastro de usuários</h1>
        <input placeholder="Nome" name="Nome: " type="text" ref={inputName}/>
        <input placeholder="Idade" name="Idade: " type="number" ref={inputAge}/>
        <input placeholder="Email" name="Email: " type="email" ref={inputEmail}/>
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} class="card"> 
          <div>
            <p>Nome: <span> {user.name}</span></p>
            <p>Idade: <span> {user.age}</span></p>
            <p>Email: <span> {user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
