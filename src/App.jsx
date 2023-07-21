import './App.css'

function App() {
  //const name = "Eric";
  const handleNameChange = () =>{
    const names = ["Eric", "Blanq", "James"];
    const int = Math.floor(Math.random() * names.length);
    return names[int];
  }

  return (
    <>
      <div className="card">
        <header>
        <p>
          Hello {handleNameChange()}!
        </p>
        </header>
      </div>
    </>
  )
}

export default App
