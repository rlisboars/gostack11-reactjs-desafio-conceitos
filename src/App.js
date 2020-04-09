import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      title: `Novo Item ${Date.now()}`,
      url: `https://github.com/rlisboars/${Date.now()}`,
      techs: ["Node.js", "React"],
    };
    const response = await api.post("repositories", newRepository);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );
    if (repositoryIndex >= 0) {
      const response = await api.delete(`repositories/${id}`);
      if (response.status === 204) {
        const repositoriesTemp = [...repositories];
        repositoriesTemp.splice(repositoryIndex, 1);
        setRepositories(repositoriesTemp);
      }
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.length >= 0 &&
          repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
