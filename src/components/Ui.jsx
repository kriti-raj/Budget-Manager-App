import React, { useState, useEffect } from "react";
import { Input } from "./ui/input.jsx";

const Ui = () => {
  const [totalAmount, setTotalAmount] = useState(() => {
    const saved = localStorage.getItem("totalAmount");
    return saved ? parseFloat(saved) : 0;
  });
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [sum, setSum] = useState(() => {
    const saved = localStorage.getItem("sum");
    return saved ? parseFloat(saved) : 0;
  });
  const [input, setInput] = useState(0.0);
  const [reason, setReason] = useState("");
  const [reasons, setReasons] = useState(() => {
    const saved = localStorage.getItem("reasons");
    return saved ? JSON.parse(saved) : [];
  });
  const [amounts, setAmounts] = useState(() => {
    const saved = localStorage.getItem("amounts");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("totalAmount", totalAmount);
    localStorage.setItem("sum", sum);
    localStorage.setItem("reasons", JSON.stringify(reasons));
    localStorage.setItem("amounts", JSON.stringify(amounts));
  }, [totalAmount, sum, reasons, amounts]);

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

  const handleReset = () => {
    // Clear localStorage
    localStorage.removeItem("totalAmount");
    localStorage.removeItem("sum");
    localStorage.removeItem("reasons");
    localStorage.removeItem("amounts");

    // Reset state values
    setTotalAmount(0);
    setSum(0);
    setInput(0.0);
    setReason("");
    setReasons([]);
    setAmounts([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-center font-bold text-4xl mb-12 text-gray-800">
          Expense Tracker
        </h1>

        <form onSubmit={expCalc} className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            <label className="md:col-span-1 font-semibold text-gray-700">
              Enter Details:
            </label>

            <Input
              type="text"
              placeholder="Enter Expenditure Reason"
              onChange={handleReason}
              value={reason}
              className="col-span-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <Input
              type="number"
              step="1"
              placeholder="Amount"
              className="col-span-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={handleChanges}
              value={input === 0.0 ? "" : input}
            />

            <button
              type="submit"
              disabled={input === 0.0 || reason === ""}
              className={`col-span-1 w-full bg-blue-600 text-white px-6 py-2 rounded-lg transition-all duration-200 ${
                input === 0.0 || reason === ""
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700 active:transform active:scale-95"
              }`}
            >
              Add Expense
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg text-gray-800 mb-4">
              Expenditure List
            </h3>
            <div className="space-y-2">
              {reasons.map((reason, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white p-3 rounded-lg"
                >
                  <span className="text-gray-700">{reason}</span>
                  <span className="font-medium text-blue-600">
                    ₹{amounts[index].toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 shadow-sm">
            <div className="space-y-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Total Balance
                </h2>
                <p className="text-3xl font-bold text-blue-600">
                  ₹{totalAmount.toFixed(2)}
                </p>
              </div>

              <div className="text-center p-4 bg-white rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Remaining Amount
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  ₹{remainingAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-end gap-4 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <label className="font-semibold text-gray-700">
              Total Bank Balance:
            </label>
            <Input
              type="number"
              step="1"
              className="w-36 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={handleTotalAmountChange}
              value={totalAmount === 0 ? "" : totalAmount}
            />
          </div>
          <button
            onClick={handleReset}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ui;
