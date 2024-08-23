import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('addition');
  const [inputs, setInputs] = useState([{ value: '' }]);
  const [result, setResult] = useState('');

  const addInputField = () => {
    setInputs([...inputs, { value: '' }]);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputs];
    values[index].value = event.target.value;
    setInputs(values);
  };

  const parseMeasurement = (input) => {
    const regex = /(?:(\d+)\s*ft\s*)?(?:(\d+)\s*(?:in|(\d+)\/(\d+)))?/;
    const match = input.trim().match(regex);
    if (!match) return NaN;

    const feet = parseInt(match[1]) || 0;
    const inches = parseInt(match[2]) || 0;
    const fractionNumerator = parseInt(match[3]) || 0;
    const fractionDenominator = parseInt(match[4]) || 1;
    const fractionInches = fractionNumerator / fractionDenominator;

    return feet * 12 + inches + fractionInches;
  };

  const handleCalculate = () => {
    const valuesInInches = inputs.map(input => parseMeasurement(input.value));

    if (valuesInInches.some(isNaN)) {
      setResult('Invalid input');
      return;
    }

    let resultInInches;
    switch (activeTab) {
      case 'addition':
        resultInInches = valuesInInches.reduce((acc, curr) => acc + curr, 0);
        setResult(formatMeasurement(resultInInches));
        break;
      case 'subtraction':
        resultInInches = valuesInInches.reduce((acc, curr) => acc - curr);
        setResult(formatMeasurement(resultInInches));
        break;
      case 'multiplication':
        resultInInches = valuesInInches.reduce((acc, curr) => acc * curr, 1);
        setResult(formatSquareFeet(resultInInches));
        break;
      case 'division':
        resultInInches = valuesInInches.reduce((acc, curr) => (curr !== 0 ? acc / curr : NaN));
        setResult(formatMeasurement(resultInInches));
        break;
      default:
        setResult('Invalid operation');
        return;
    }
  };

  const formatMeasurement = (inches) => {
    if (isNaN(inches)) return 'Error in calculation';
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return `${feet} ft ${remainingInches.toFixed(2)} in`;
  };

  const formatSquareFeet = (inches) => {
    if (isNaN(inches)) return 'Error in calculation';
    const squareFeet = inches / 144; // 12 inches * 12 inches = 144 square inches per square foot
    return `${squareFeet.toFixed(2)} square feet`;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Construction Calculator</h1>
      </header>
      <div className="tabs">
        <button onClick={() => setActiveTab('addition')} className={activeTab === 'addition' ? 'active' : ''}>Addition</button>
        <button onClick={() => setActiveTab('subtraction')} className={activeTab === 'subtraction' ? 'active' : ''}>Subtraction</button>
        <button onClick={() => setActiveTab('multiplication')} className={activeTab === 'multiplication' ? 'active' : ''}>Multiplication</button>
        <button onClick={() => setActiveTab('division')} className={activeTab === 'division' ? 'active' : ''}>Division</button>
      </div>
      <div className="calculator">
        {inputs.map((input, index) => (
          <div className="input-section" key={index}>
            <label>Measurement {index + 1}:</label>
            <input
              type="text"
              value={input.value}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="1 ft 2 1/2 in"
            />
          </div>
        ))}
        <button onClick={addInputField} className="add-btn">Add Another Measurement</button>
        <button onClick={handleCalculate} className="calculate-btn">Calculate</button>
        <div className="result-section">
          <h2>Result: {result}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;

