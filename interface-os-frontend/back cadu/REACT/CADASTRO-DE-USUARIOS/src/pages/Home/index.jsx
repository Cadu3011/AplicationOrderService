import './style.css'
import Trash from '../../assets/Trash.jpeg'

function Home() {

  const users = [
  ]


  return (

    <div className='container'>
      <form>
        <h1>Sistema Queijo</h1>
        <input placeholder='Login' name='name' type='text'/>      
        <input placeholder='Senha' name='senha' number='number'/>
        <button type='button'>Entrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Name: <span>{user.name}</span></p>
            <p>Age: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <div>
            <button>
              <img src={Trash} />
            </button>
          </div>
        </div>

      ))}



    </div>


  )
}

export default Home