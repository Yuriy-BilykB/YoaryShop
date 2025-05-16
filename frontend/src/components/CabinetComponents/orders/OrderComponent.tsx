import { IOrder } from "@/interfaces/IOrderInfo";

type OrderProps = {
    order: IOrder;
};
const OrderComponent = ({ order }: OrderProps) => {
    const statusBadgeClass = order.isDone
        ? "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
        : "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium";

    return (
        <div className="bg-white p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-xl text-gray-800">
                    Замовлення <span className="text-blue-600">#{order.id || "000"}</span>
                </h3>
                <div className="flex items-center">
          <span className="font-semibold text-lg text-gray-700 mr-2">
            {order.totalSum} грн
          </span>
                    <span className={statusBadgeClass}>
            {order.isDone ? "Виконано" : "Очікує обробки"}
          </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Контактна особа</span>
                        <span className="font-medium text-gray-800">{order.firstName} {order.lastName}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Телефон</span>
                        <span className="font-medium text-gray-800">{order.phone}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Доставка</span>
                        <span className="font-medium text-gray-800">м. {order.city}, Відділення {order.warehouse}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Спосіб оплати</span>
                        <span className="font-medium text-gray-800">{order.payment}</span>
                    </div>
                </div>
            </div>

            {order.comment && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <span className="text-sm text-gray-500 block mb-1">Коментар</span>
                    <p className="text-gray-700">{order.comment}</p>
                </div>
            )}
        </div>
    );
};

export default OrderComponent;