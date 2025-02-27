
import "./App.css"

import React, { useState } from "react"
import {
  useGetAllCarsQuery,
  useAddCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useToggleLikeMutation,
} from "./src/store/carsApi"
import { Button, Card, Modal, message, Tag } from "antd"
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons"
import CarForm from "./src/components/car-form"
import CarDetail from "./src/components/car-detail"

function App() {
  const { data: cars = [], isLoading, error } = useGetAllCarsQuery()
  const [addCar] = useAddCarMutation()
  const [updateCar] = useUpdateCarMutation()
  const [deleteCar] = useDeleteCarMutation()
  const [toggleLike] = useToggleLikeMutation()

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

  const showAddModal = () => {
    setIsAddModalVisible(true)
  }

  const showEditModal = (car) => {
    setCurrentCar(car)
    setIsEditModalVisible(true)
  }

  const handleAddCar = async (values) => {
    try {
      // Set default values for new car
      const newCar = {
        ...values,
        isLiked: false,
      }

      await addCar(newCar).unwrap()
      setIsAddModalVisible(false)
      message.success("Car added successfully!")
    } catch (err) {
      message.error("Failed to add car: " + err.message)
    }
  }

  const handleUpdateCar = async (values) => {
    try {
      await updateCar({
        id: currentCar.id,
        ...values,
        isLiked: currentCar.isLiked, // Preserve the liked status
      }).unwrap()
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

  const handleToggleLike = async (id, isLiked) => {
    try {
      await toggleLike({ id, isLiked: !isLiked }).unwrap()
    } catch (err) {
      message.error("Failed to update like status: " + err.message)
    }
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
        {cars.map((car) => (
          <li key={car.id}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <div className="h-[150px] bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl font-bold">{car.carName.substring(0, 1)}</span>
                </div>
              }
              actions={[
                car.isLiked ? (
                  <HeartFilled
                    key="like"
                    style={{ color: "red" }}
                    onClick={() => handleToggleLike(car.id, car.isLiked)}
                  />
                ) : (
                  <HeartOutlined key="like" onClick={() => handleToggleLike(car.id, car.isLiked)} />
                ),
                <EyeOutlined key="view" onClick={() => viewCarDetail(car.id)} />,
                <EditOutlined key="edit" onClick={() => showEditModal(car)} />,
                <DeleteOutlined key="delete" onClick={() => handleDeleteCar(car.id)} />,
              ]}
            >
              <div>
                <h4 className="line-clamp-1 font-bold">{car.carName}</h4>
                <p className="text-lg font-semibold text-green-600">{car.carPrice}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <Tag color="blue">{car.region}</Tag>
                  <Tag color="green">{car.status}</Tag>
                  <Tag color="orange">{car.carYear}</Tag>
                </div>
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

