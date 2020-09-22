import React, {useState, useEffect} from "react";
import api from "./services/api";
import './styles.css';


import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: 'http://github.com/viaReact',
      techs: ["ReactJS","NodeJS","Integração"]
    })
    const repository = response.data;
    setRepositories([...repositories, repository ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    //Com o filter eu vou iterar dentro do meu repositories, e para cada id que não seja igual aquele que eu quero
    // excluir, ele vai adicionar dentro do novo repositories.
    setRepositories(repositories.filter(repository => repository.id !== id));
    window.location.reload();
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => {
            return <li key={repository.id}>{repository.title}
             <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button></li>
          })}
        
      </ul>

      <button type="button" onClick={handleAddRepository}>Adicionar</button>
      <button onClick={() => handleRemoveRepository("removeAll")}>Remover Todos</button>
      
    </div>
  );
}

export default App;
