/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Input } from "./components/ui/input";

const App = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [sum, setSum] = useState(0.0);
  const [input, setInput] = useState(0.0);
  const [reason, setReason] = useState("");
  const [reasons, setReasons] = useState([]);
  const [amounts, setAmounts] = useState([]);

  useEffect(() => {
    setRemainingAmount(totalAmount - sum);
  }, [totalAmount, sum]);

  const handleTotalAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setTotalAmount(isNaN(value) ? 0 : value);
  };

  const handleChanges = (e) => {
    const value = parseFloat(e.target.value);
    setInput(isNaN(value) ? 0.0 : value);
  };

  const handleReason = (e) => {
    setReason(e.target.value);
  };

  const expCalc = (e) => {
    e.preventDefault();
    if (input === 0.0 || reason === "") {
      return;
    }
    setSum((prevSum) => parseFloat((prevSum + input).toFixed(2)));
    setReasons((prevReasons) => [...prevReasons, reason]);
    setAmounts((prevAmounts) => [...prevAmounts, input]);
    setInput(0.0);
    setReason("");
  };

  return (
    <div className="m-8">
      <h1 className="text-center font-bold text-3xl mb-8">Expense Tracker</h1>

      <form onSubmit={expCalc}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <label className="md:col-span-1 font-bold ml-16">
            Enter Expenditure Details:
          </label>

          <Input
            type="text"
            placeholder="Enter Expenditure Reason"
            onChange={handleReason}
            value={reason}
            className="col-span-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />

          <Input
            type="number"
            step="1"
            className="col-span-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            onChange={handleChanges}
            value={input === 0.0 ? "" : input}
          />

          <button
            type="submit"
            disabled={input === 0.0 || reason === ""}
            className={`col-span-1 bg-black border-2 border-red-600 text-white px-4 py-2 rounded-lg ${
              input === 0.0 || reason === ""
                ? "opacity-50 cursor-not-allowed"
                : ""
            } focus:outline-none focus:bg-gray-700`}
            style={{
              opacity: input === 0.0 || reason === "" ? 0.5 : 1,
              cursor:
                input === 0.0 || reason === "" ? "not-allowed" : "pointer",
            }}
          >
            Calculate
          </button>
        </div>
      </form>

      <hr className="my-8" />

      <div className="flex flex-row items-start justify-around mb-8">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <h3 className="font-bold text-center mb-4">Expenditure:</h3>
          <ul className="border border-gray-300 rounded px-3 py-2">
            {reasons.map((reason, index) => (
              <li key={index} className="mb-1">
                {reason}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="font-bold text-center mb-4">Amount Paid:</h3>
          <ul className="border border-gray-300 rounded px-3 py-2">
            {amounts.map((amount, index) => (
              <li key={index} className="mb-1">
                {amount.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="my-8" />

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4">
          Total Amount Left: {totalAmount.toFixed(2)}
        </h2>
        <h3 className="font-bold">
          Remaining Amount: {remainingAmount.toFixed(2)}
        </h3>
      </div>

      <div className="mb-8 flex flex-col md:flex-row items-center justify-end gap-4">
        <label className="font-bold">Total Bank Balance:</label>
        <Input
          type="number"
          step="1"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 w-36"
          onChange={handleTotalAmountChange}
          value={totalAmount === 0 ? "" : totalAmount}
        />
      </div>
    </div>
  );
};

export default App;
