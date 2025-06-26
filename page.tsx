
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const App = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    endereco: "",
    telefone: "",
    cidade: "",
    bairro: "",
    email: "",
    cpf: "",
    status: "Em concerto",
    foto: null
  });
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cadastros");
    if (stored) setEntries(JSON.parse(stored));
  }, []);

  const handleLogin = () => {
    if (user && password) setLoggedIn(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm({ ...form, foto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const novo = [...entries, form];
    localStorage.setItem("cadastros", JSON.stringify(novo));
    setEntries(novo);
    setForm({
      nome: "",
      endereco: "",
      telefone: "",
      cidade: "",
      bairro: "",
      email: "",
      cpf: "",
      status: "Em concerto",
      foto: null
    });
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-green-900 flex items-center justify-center p-4">
        <Card className="max-w-sm w-full p-6 bg-gray-800 text-white">
          <CardContent className="space-y-4">
            <h1 className="text-xl font-bold">Login Funcionário</h1>
            <Input placeholder="Usuário" value={user} onChange={(e) => setUser(e.target.value)} className="bg-gray-700 text-white" />
            <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-700 text-white" />
            <Button onClick={handleLogin} className="w-full bg-green-600 hover:bg-green-500">Entrar</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Celular para Concerto</h1>
      <Card className="bg-gray-800 p-4 space-y-3">
        <CardContent className="space-y-3">
          {["nome", "endereco", "telefone", "cidade", "bairro", "email", "cpf"].map((key) => (
            <Input key={key} name={key} placeholder={key.charAt(0).toUpperCase() + key.slice(1)} value={form[key]} onChange={handleChange} className="bg-gray-700 text-white" />
          ))}
          <select name="status" value={form.status} onChange={handleChange} className="bg-gray-700 text-white p-2 rounded w-full">
            <option value="Em concerto">Em concerto</option>
            <option value="Pronto">Pronto</option>
          </select>
          <input type="file" accept="image/*" onChange={handleFileChange} className="bg-gray-700 text-white" />
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-500">Cadastrar</Button>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Celulares Cadastrados</h2>
        <ul className="space-y-2">
          {entries.map((entry, index) => (
            <li key={index} className="p-2 bg-gray-700 rounded">
              <strong>{entry.nome}</strong> - {entry.telefone} ({entry.cidade}) - <em>{entry.status}</em><br />
              {entry.foto && <img src={entry.foto} alt="Foto do dispositivo" className="mt-2 max-h-32 rounded" />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
