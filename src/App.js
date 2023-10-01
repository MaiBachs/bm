import useRoutesElements from "./useRoutesElements";

function App() {
  const routeElements = useRoutesElements();
  return <div> {routeElements}</div>;
}

export default App;
