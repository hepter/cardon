import { CardonContainer } from "cardon";
import "./App.css";
import Main from "./Main";

function App({ isLoading, percentage, statusList }) {
  return (
    <div className="App">
      <header className="App-header">
        <Main />        
        <CardonContainer />
      </header>
    </div >
  );
}

export default App;
