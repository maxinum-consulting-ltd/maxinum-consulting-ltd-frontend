import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  Space,
  DatePicker,
  InputNumber,
} from "antd";
import type { DatePickerProps } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { DataType, TransactionFormValues } from "../interface";

const { Option } = Select;
const { TextArea } = Input;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface EditTransactionProps {
  singleTransaction?: DataType;
  isEditModalOpen: boolean;
  closeEditModal: () => void;
  getTransactions: () => void;
}

const EditTransaction = ({
  singleTransaction,
  isEditModalOpen,
  closeEditModal,
  getTransactions,
}: EditTransactionProps) => {
  console.log(singleTransaction);

  const [form] = Form.useForm();

  const onFinish = async (values: TransactionFormValues) => {
    try {
      await axios.patch(`http://localhost:5000/${singleTransaction?.id}`, {
        ...values,
        date: values.date ? values.date.format("YYYY-MM-DD") : null,
      });
    } catch (error) {
      console.log(error);
    }

    closeEditModal();
    getTransactions();
  };

  const onReset = () => {
    form.resetFields();
    closeEditModal();
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <>
      <Modal
        title="Добавить транзакцию"
        open={isEditModalOpen}
        onCancel={() => closeEditModal()}
        footer={false}
      >
        <Form
          {...layout}
          form={form}
          name="edit"
          onFinish={onFinish}
          initialValues={{
            author: singleTransaction?.author || "",
            date: dayjs(singleTransaction?.date) || null,
            sum: singleTransaction?.sum || 0,
            category: singleTransaction?.category || "",
            comment: singleTransaction?.comment || "",
          }}
          style={{ width: 400 }}
        >
          <Form.Item name="author" label="Автор" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Дата" rules={[{ required: true }]}>
            <DatePicker onChange={onChange} />
          </Form.Item>
          <Form.Item name="sum" label="Сумма" rules={[{ required: true }]}>
            <InputNumber style={{ width: 180 }} />
          </Form.Item>
          <Form.Item
            name="category"
            label="Категория"
            rules={[{ required: true }]}
          >
            <Select placeholder="Выберите категорию" allowClear>
              <Option value="Доходы">Доходы</Option>
              <Option value="Расходы">Расходы</Option>
              <Option value="Активы">Активы</Option>
              <Option value="Обязательства">Обязательства</Option>
              <Option value="Капитал">Капитал</Option>
              <Option value="Инвестиции">Инвестиции</Option>
              <Option value="Прочие транзакции">Прочие транзакции</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="comment"
            label="Комментарий"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item {...tailLayout} className="text-right">
            <Space>
              <Button type="primary" htmlType="submit">
                Отправить
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Отмена
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditTransaction;
