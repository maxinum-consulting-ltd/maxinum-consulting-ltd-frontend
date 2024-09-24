import { useState } from "react";
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
import { TransactionFormValues } from "../interface";

const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface CreateTransactionProps {
  getTransactions: () => void;
}

const CreateTransaction = ({ getTransactions }: CreateTransactionProps) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: TransactionFormValues) => {
    try {
      await axios.post("http://localhost:5000", {
        ...values,
        date: values.date ? values.date.format("YYYY-MM-DD") : null,
      });
    } catch (error) {
      console.log(error);
    }

    setOpen(false);
    getTransactions();
  };

  const onReset = () => {
    form.resetFields();
    setOpen(false);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Добавить транзакцию
      </Button>
      <Modal
        title="Добавить транзакцию"
        open={open}
        onCancel={() => setOpen(false)}
        footer={false}
        className=""
      >
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
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

export default CreateTransaction;
