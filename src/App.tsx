import React, { useCallback, useMemo, useState } from 'react';
import './App.css';

const calculatriceNumbers = new Array(10)
  .fill("")
  .map( (_,i) => i)
  .reverse()

interface IOperator {
  symbol: string, 
  handler: (a: number, b: number) => number
}

const OPERATORS: IOperator[] = [
  {
    symbol: "X",
    handler: (a, b) => a * b
  },
  {
    symbol: "+",
    handler: (a, b) => a + b
  },
  {
    symbol: "-",
    handler: (a, b) => a - b
  },
  {
    symbol: "/",
    handler: (a, b) => a / b
  }
]

function App() {
  const [numA, setNumA] = useState<number | null>(null)
  const [numB, setNumB] = useState<number | null>(null)
  const [operator, setOperator] = useState<IOperator | null>(null)

  const handleNumberClick = useCallback(
    (num: number) => {
      if(operator){
        setNumB(numB ? numB * 10 + num : num)
      }
      else {
        setNumA(numA ? numA * 10 + num : num)
      }
    },
    [numA, numB, operator],
  )

  const handleOperatorClick = useCallback(
    (o: IOperator) => {
      if(numB || numB === 0){
        setNumA( (operator as IOperator).handler(numA as number, numB) )
        setNumB(null)
      }
      setOperator(o)
    },
    [operator, numA, numB]
  )

  const handleEqual = useCallback(
    () => {
      if((numA || numA === 0) && (numB || numB === 0) && operator ){
        setNumA(operator.handler(numA, numB))
        setNumB(null)
        setOperator(null)
      }
    }, [numA, numB, operator]
  )

  const screenValue = useMemo(() => {
    const numAValue = (numA || numA === 0) ? numA.toString() : ''
    const numBValue = (numB || numB === 0) ? numB.toString() : ''
    const operatorValue = operator?.symbol || ''
    return `${numAValue} ${operatorValue} ${numBValue}` 
  }, [numB, numA, operator])

  return (
    <div className="App">
      <h1>Calculatrice</h1>
      <div className="container">
        <div className="screen">
          {screenValue}
        </div>
        <div className="buttons">
          <div className="numbers">
            {calculatriceNumbers.map(num => 
              <button 
                className="button-number"
                onClick={() => handleNumberClick(num)}
              >
                {num}
              </button>  
            )}
            <button 
                className="button-equal" 
                onClick={handleEqual}
              >
                =
              </button>
          </div>
          <div className="operators">
            {OPERATORS.map(o => 
              <button
                className="button-operator"
                onClick={() => handleOperatorClick(o)}
              >
                {o.symbol}
              </button>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
