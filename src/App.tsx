import { useEffect, useState } from "react";
import CreateTransaction from "./components/CreateTransaction";
import TransactionsTable from "./components/TransactionsTable";
import axios from "axios";
import { DataType } from "./interface";


function App() {
  const [data, setData] = useState<DataType[]>([]);

  const getTransactions = async () => {
    const response = await axios.get("http://localhost:5000");
    const dataWithKey = response.data.map((fetchedData: DataType) => {
      return {
        ...fetchedData,
        key: fetchedData.id,
      };
    });
    setData(dataWithKey);
  };

  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <div className="max-w-[1440px] px-8 py-4 m-auto">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl">Транзакции</h1>
        <div className=" self-end">
          <CreateTransaction getTransactions={getTransactions} />
        </div>
        <TransactionsTable data={data} getTransactions={getTransactions} />
      </div>
    </div>
  );
}

export default App;
