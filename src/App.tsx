import { useState } from "react";
import "./App.css";

function App({ title }: { title: string }) {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello {title}</h1>
      <div>Counter: {count}</div>
    </>
  );
}

export default App;
