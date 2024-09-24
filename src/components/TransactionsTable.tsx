import { useState } from "react";
import { Table, Dropdown, Button, MenuProps } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import axios from "axios";
import EditTransaction from "./EditTransaction";
import { DataType } from "../interface";

const { Column } = Table;

interface TransactionsTableProps {
  data: DataType[];
  getTransactions: () => void;
}

const TransactionsTable = ({
  data,
  getTransactions,
}: TransactionsTableProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [singleTransaction, setSingleTransaction] = useState<DataType>();

  const handleEdit = (record: DataType) => {
    setSingleTransaction(record);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/${id}`);
      getTransactions();
    } catch (error) {
      console.error("Ошибка при удалении транзакции:", error);
    }
  };

  const createMenuItems = (record: DataType): MenuProps["items"] => [
    {
      key: "edit",
      label: "Редактировать",
      onClick: () => handleEdit(record),
    },
    {
      key: "delete",
      label: "Удалить",
      onClick: () => handleDelete(record.id),
    },
  ];

  return (
    <>
      <Table<DataType>
        dataSource={data}
        className="min-w-[1200px] text-gray-300"
      >
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Автор" dataIndex="author" key="author" />
        <Column title="Дата" dataIndex="date" key="dateTime" />
        <Column title="Сумма" dataIndex="sum" key="sum" />
        <Column title="Категория" dataIndex="category" key="category" />
        <Column title="Комментарий" dataIndex="comment" key="comment" />
        <Column
          title="Действия"
          key="actions"
          render={(_, record: DataType) => (
            <Dropdown
              menu={{ items: createMenuItems(record) }}
              trigger={["click"]}
            >
              <Button icon={<EllipsisOutlined />} />
            </Dropdown>
          )}
        />
      </Table>
      <EditTransaction
        singleTransaction={singleTransaction}
        isEditModalOpen={isEditModalOpen}
        closeEditModal={closeEditModal}
        getTransactions={getTransactions}
      />
    </>
  );
};

export default TransactionsTable;
