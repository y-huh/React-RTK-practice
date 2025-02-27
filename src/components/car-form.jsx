
import { useEffect } from "react"
import { Form, Input, Button, Select, Modal } from "antd"
import React from "react"

const CarForm = ({ visible, onCancel, onSubmit, initialValues = {}, isEditing = false }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
    }
  }, [visible, initialValues, form])

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values)
        form.resetFields()
      })
      .catch((info) => {
        console.log("Validate Failed:", info)
      })
  }

  return (
    <Modal
      open={visible}
      title={isEditing ? "Edit Car" : "Add New Car"}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {isEditing ? "Update" : "Add"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="carForm" initialValues={initialValues}>
        <Form.Item name="carName" label="Car Name" rules={[{ required: true, message: "Please enter car name!" }]}>
          <Input />
        </Form.Item>

        <Form.Item name="carPrice" label="Price" rules={[{ required: true, message: "Please enter price!" }]}>
          <Input />
        </Form.Item>

        <Form.Item name="carYear" label="Year" rules={[{ required: true, message: "Please enter year!" }]}>
          <Input />
        </Form.Item>

        <Form.Item name="region" label="Region" rules={[{ required: true, message: "Please select region!" }]}>
          <Select>
            <Select.Option value="USA">USA</Select.Option>
            <Select.Option value="GERMANY">Germany</Select.Option>
            <Select.Option value="JAPAN">Japan</Select.Option>
            <Select.Option value="CHINA">China</Select.Option>
            <Select.Option value="SOUTH KOREA">South Korea</Select.Option>
            <Select.Option value="UK">UK</Select.Option>
            <Select.Option value="FRANCE">France</Select.Option>
            <Select.Option value="ITALY">Italy</Select.Option>
            <Select.Option value="SWEDEN">Sweden</Select.Option>
            <Select.Option value="CZECH REPUBLIC">Czech Republic</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select status!" }]}>
          <Select>
            <Select.Option value="new">New</Select.Option>
            <Select.Option value="used">Used</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CarForm

