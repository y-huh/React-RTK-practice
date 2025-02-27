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
        <Form.Item name="title" label="Car Name" rules={[{ required: true, message: "Please enter car name!" }]}>
          <Input />
        </Form.Item>

        <Form.Item name="price" label="Price" rules={[{ required: true, message: "Please enter price!" }]}>
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter description!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item name="category" label="Category" rules={[{ required: true, message: "Please select category!" }]}>
          <Select>
            <Select.Option value="smartphones">Smartphones</Select.Option>
            <Select.Option value="laptops">Laptops</Select.Option>
            <Select.Option value="fragrances">Fragrances</Select.Option>
            <Select.Option value="skincare">Skincare</Select.Option>
            <Select.Option value="groceries">Groceries</Select.Option>
            <Select.Option value="home-decoration">Home Decoration</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="brand" label="Brand" rules={[{ required: true, message: "Please enter brand!" }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CarForm

