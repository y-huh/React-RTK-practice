import { useGetCarQuery } from "../store/carsApi"
import { Card, Descriptions, Spin, Button, Tag } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"

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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{car.carName}</h1>
          <div className="text-2xl text-green-600 font-bold mb-4">{car.carPrice}</div>

          <div className="flex justify-center gap-2 mb-4">
            <Tag color="blue">{car.region}</Tag>
            <Tag color="green">{car.status}</Tag>
            <Tag color="orange">{car.carYear}</Tag>
          </div>
        </div>

        <Descriptions bordered column={1} size="large">
          <Descriptions.Item label="Car Name">{car.carName}</Descriptions.Item>
          <Descriptions.Item label="Price">{car.carPrice}</Descriptions.Item>
          <Descriptions.Item label="Year">{car.carYear}</Descriptions.Item>
          <Descriptions.Item label="Region">{car.region}</Descriptions.Item>
          <Descriptions.Item label="Status">{car.status}</Descriptions.Item>
          <Descriptions.Item label="Liked">{car.isLiked ? "Yes" : "No"}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  )
}

export default CarDetail

