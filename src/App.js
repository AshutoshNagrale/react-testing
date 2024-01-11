import "./App.css";
import Counter from "./Counter";
import Login from "./Login";

function App() {
  return (
    <div className="App">
      <Counter initialCount={0} />
      <Login />
    </div>
  );
}

export default App;
