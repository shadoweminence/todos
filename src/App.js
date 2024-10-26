import "./App.css";
import Lists from "./components/Lists";
import TaskProvider from "./context/TaskProvider";

function App() {
  return (
    <TaskProvider>
      <div className="App">
        <Lists />
      </div>
    </TaskProvider>
  );
}

export default App;
