import React from "react"
import "./App.css"
import { useState } from "react"
import { useGetAllCarsQuery, useAddCarMutation, useUpdateCarMutation, useDeleteCarMutation } from "./src/store/carsApi"
import { Button, Card, Modal, message } from "antd"
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from "@ant-design/icons"
import CarForm from "./src/components/car-form"
import CarDetail from "./src/components/car-detail"

function App() {
  const { data, isLoading, error } = useGetAllCarsQuery()
  const [addCar] = useAddCarMutation()
  const [updateCar] = useUpdateCarMutation()
  const [deleteCar] = useDeleteCarMutation()

  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [currentCar, setCurrentCar] = useState(null)
  const [selectedCarId, setSelectedCarId] = useState(null)

  if (isLoading) {
    return <h1 className="font-bold text-center mt-10">Loading ... </h1>
  }

  if (error) {
    return <h1 className="font-bold text-center mt-10">Error: {error.message}</h1>
  }

  const cars = data?.products || []

  const showAddModal = () => {
    setIsAddModalVisible(true)
  }

  const showEditModal = (car) => {
    setCurrentCar(car)
    setIsEditModalVisible(true)
  }

  const handleAddCar = async (values) => {
    try {
      await addCar(values).unwrap()
      setIsAddModalVisible(false)
      message.success("Car added successfully!")
    } catch (err) {
      message.error("Failed to add car: " + err.message)
    }
  }

  const handleUpdateCar = async (values) => {
    try {
      await updateCar({ id: currentCar.id, ...values }).unwrap()
      setIsEditModalVisible(false)
      message.success("Car updated successfully!")
    } catch (err) {
      message.error("Failed to update car: " + err.message)
    }
  }

  const handleDeleteCar = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this car?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await deleteCar(id).unwrap()
          message.success("Car deleted successfully!")
        } catch (err) {
          message.error("Failed to delete car: " + err.message)
        }
      },
    })
  }

  const viewCarDetail = (id) => {
    setSelectedCarId(id)
  }

  // If a car is selected, show its detail view
  if (selectedCarId) {
    return <CarDetail id={selectedCarId} onBack={() => setSelectedCarId(null)} />
  }

  return (
    <div className="mt-10 px-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Cars Catalog</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
          Add New Car
        </Button>
      </div>

      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
          listStyle: "none",
          padding: 0,
        }}
      >
        {cars.map((item) => (
          <li key={item.id}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img className="!h-[200px] object-cover" alt="product" src={item.images?.[0] || "/placeholder.svg"} />
              }
              actions={[
                <EyeOutlined key="view" onClick={() => viewCarDetail(item.id)} />,
                <EditOutlined key="edit" onClick={() => showEditModal(item)} />,
                <DeleteOutlined key="delete" onClick={() => handleDeleteCar(item.id)} />,
              ]}
            >
              <div>
                <h4 className="line-clamp-1 font-bold">{item.title}</h4>
                <p className="text-lg font-semibold text-green-600">${item.price}</p>
                <p className="line-clamp-2 text-gray-500">{item.description}</p>
                <p className="mt-2">
                  <span className="font-medium">Brand:</span> {item.brand}
                </p>
                <p>
                  <span className="font-medium">Category:</span> {item.category}
                </p>
              </div>
            </Card>
          </li>
        ))}
      </ul>

      {/* Add Car Modal */}
      <CarForm
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onSubmit={handleAddCar}
        isEditing={false}
      />

      {/* Edit Car Modal */}
      <CarForm
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onSubmit={handleUpdateCar}
        initialValues={currentCar}
        isEditing={true}
      />
    </div>
  )
}

export default App

