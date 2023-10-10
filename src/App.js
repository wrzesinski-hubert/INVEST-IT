import "./App.css";
import Header from "./components/Header";
import List from "./components/List";
import { useSelector } from "react-redux";

function App() {
  const isDarkTheme = useSelector((state) => state.app.isDarkMode);

  return (
    <div className={isDarkTheme ? "dark-mode" : ""}>
      <Header />
      <List />
    </div>
  );
}

export default App;
