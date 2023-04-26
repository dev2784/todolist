import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import List from "./Components/list/List";
import TodoCreate from "./Components/TodoCreate/TodoCreate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<List />} />
        <Route path="/create" element={<TodoCreate />} />
        <Route path="/create/:id" element={<TodoCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
