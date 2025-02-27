import { useGetCarQuery } from "../store/carsApi"
import { Card, Descriptions, Spin, Image, Button } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"
import React from "react"

const CarDetail = ({ id, onBack }) => {
  const { data: car, isLoading, error } = useGetCarQuery(id)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error.message}</div>
  }

  if (!car) {
    return <div className="text-center">Car not found</div>
  }

  return (
    <div className="p-4">
      <Button icon={<ArrowLeftOutlined />} onClick={onBack} className="mb-4">
        Back to List
      </Button>

      <Card className="w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Image
              src={car.images?.[0] || "/placeholder.svg"}
              alt={car.title}
              className="w-full rounded-lg"
              fallback="/placeholder.svg?height=300&width=400"
            />
            <div className="mt-4 grid grid-cols-3 gap-2">
              {car.images?.slice(1, 4).map((img, index) => (
                <Image
                  key={index}
                  src={img || "/placeholder.svg"}
                  alt={`${car.title} - ${index + 1}`}
                  className="w-full h-20 object-cover rounded"
                  fallback="/placeholder.svg?height=80&width=80"
                />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2">{car.title}</h1>
            <div className="text-2xl text-green-600 font-bold mb-4">${car.price}</div>

            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Brand">{car.brand}</Descriptions.Item>
              <Descriptions.Item label="Category">{car.category}</Descriptions.Item>
              <Descriptions.Item label="Rating">{car.rating} ⭐</Descriptions.Item>
              <Descriptions.Item label="Stock">{car.stock} units</Descriptions.Item>
              <Descriptions.Item label="Discount">{car.discountPercentage}%</Descriptions.Item>
            </Descriptions>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Description:</h3>
              <p className="text-gray-700">{car.description}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CarDetail

