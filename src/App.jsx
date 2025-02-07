import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";
// import Example from './components/Card'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolAllowed, setSymbolAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'QWERTYUIOPLKJHGFDSAZXCVBNMmnbvcxzasdfghjklpoiuytrewq';
    if (numberAllowed) str += '1234567890';
    if (symbolAllowed) str += '!@#$%^&*()_+';
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, numberAllowed, symbolAllowed])

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, symbolAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select()
  }

  return (
    <div className="w-full max-w-md mx-auto shadow-md
    rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-white">
        <input type="text"
          value={password} className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}/>
        <button onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range"
            min={6}
            max={10}
            value={length}
            className="curser-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length">Length: { length }</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)} />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
            defaultChecked={symbolAllowed}
            onChange={() => setSymbolAllowed((prev) => !prev)} />
          <label htmlFor="symbol">Symbols</label>
        </div>
      </div>
    </div>
  );
}

export default App;
