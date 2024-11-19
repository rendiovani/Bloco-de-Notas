import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Estado para armazenar as notas
  const [nota, setNota] = useState('');
  const [notas, setNotas] = useState(() => {
    // Recupera as notas do localStorage (se houver)
    const savedNotes = localStorage.getItem('notas');
    return savedNotes ? JSON.parse(savedNotes) : []; // Se não houver, retorna um array vazio
  });

  // Função para adicionar uma nova nota
  const handleAddNota = () => {
    if (nota.trim() === '') return; // Evita adicionar notas vazias

    const novaNota = {
      id: Date.now(), // Garante um identificador único para cada nota
      texto: nota,
    };

    const updatedNotas = [...notas, novaNota]; // Adiciona a nova nota ao array
    setNotas(updatedNotas); // Atualiza o estado local
    localStorage.setItem('notas', JSON.stringify(updatedNotas)); // Salva as notas no localStorage

    setNota(''); // Limpa o campo de texto após adicionar
  };

  // Função para remover uma nota
  const handleRemoveNota = (id) => {
    const updatedNotas = notas.filter(nota => nota.id !== id);
    setNotas(updatedNotas); // Atualiza o estado local
    localStorage.setItem('notas', JSON.stringify(updatedNotas)); // Atualiza no localStorage
  };

  return (
    <div className="container">
      <div className="notepad">
        <h1 className="title">Bloco de Notas</h1>
        <textarea
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          placeholder="Digite sua nova nota..."
          className="textarea"
        />
        <div className="actions">
          <button onClick={handleAddNota} className="button save">Adicionar Nota</button>
        </div>
        <div className="notes-list">
          {notas.length === 0 ? (
            <p>Nenhuma nota salva!</p>
          ) : (
            notas.map((nota) => (
              <div key={nota.id} className="note">
                <p>{nota.texto}</p>
                <button className="button clear" onClick={() => handleRemoveNota(nota.id)}>
                  Remover
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

