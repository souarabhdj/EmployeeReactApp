import React from "react";
import Employee from "./Components/Employee"; // Adjusted relative path
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <header className="bg-primary text-white py-3 mb-4">
        <div className="container">
          <h1 className="mb-0">📘 BOOKXPERT - Employee Management</h1>
        </div>
      </header>

      <main className="container">
        <Employee />
      </main>
    </div>
  );
}

export default App;
