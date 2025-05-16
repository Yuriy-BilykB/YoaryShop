"use client";
import React, {useState, useEffect, FC, Dispatch, useMemo} from 'react';
import {User, MapPin, CreditCard, MessageSquare, Truck, ShoppingBag} from 'lucide-react';
import {createOrder} from "@/services/orders";
import {useModal} from "@/components/LayoutComponents/ModalContext/ModalContext";
import Link from "next/link";
interface DetailOrderBarProps {
    setIsOrdered: Dispatch<React.SetStateAction<boolean>>;
}
const DetailOrderBar: FC<DetailOrderBarProps> = ({ setIsOrdered }) => {
    const {userInfo, isLogin, productsCart} = useModal();
    const [totalSum, setTotalSum] = useState<number>(0);
    const [orderId, setOrderId] = useState<number>(0);
    useEffect(() => {
        const total = productsCart.reduce((total, item) => total + item.product.price, 0);
        setTotalSum(total);
    }, [productsCart]);
    const [orderInfo, setOrderInfo] = useState({
        lastName: isLogin && 'payload' in userInfo ? userInfo.payload.lastName : '',
        firstName: isLogin && 'payload' in userInfo ? userInfo.payload.firstName : '',
        phone: isLogin && 'payload' in userInfo ? userInfo.payload.phone_number : '',
        userId: isLogin && 'payload' in userInfo ? userInfo.payload.id : null,
        region: '',
        city: '',
        warehouse: '',
        payment: 'cod',
        comment: '',
        register: false
    });

    const orderPayload = {
        ...orderInfo,
        totalSum,
        cartItems: productsCart.map(item => ({
            productId: item.product_id,
            quantity: item.quantity,
            sessionId: item.session_id
        }))
    };
    const [errors, setErrors] = useState({
        lastName: '',
        firstName: '',
        phone: '',
        region: '',
        city: '',
        warehouse: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const useLocationData = () => {
        const regions = useMemo(() => ["Київська", "Львівська", "Одеська", "Харківська", "Дніпропетровська"], []);

        const cities: { [key: string]: string[] } = useMemo(() => ({
            "Київська": ["Київ", "Бориспіль", "Бровари", "Ірпінь"],
            "Львівська": ["Львів", "Дрогобич", "Стрий", "Червоноград"],
            "Одеська": ["Одеса", "Ізмаїл", "Чорноморськ", "Білгород-Дністровський"],
            "Харківська": ["Харків", "Ізюм", "Лозова", "Чугуїв"],
            "Дніпропетровська": ["Дніпро", "Кривий Ріг", "Кам'янське", "Нікополь"]
        }), []);

        const warehouses: { [key: string]: string[] } = useMemo(() => ({
            "Київ": ["Відділення №1", "Відділення №2", "Відділення №3", "Відділення №4"],
            "Львів": ["Відділення №1", "Відділення №2", "Відділення №3"],
            "Одеса": ["Відділення №1", "Відділення №2", "Відділення №3", "Відділення №4"],
            "Харків": ["Відділення №1", "Відділення №2", "Відділення №3"],
            "Дніпро": ["Відділення №1", "Відділення №2", "Відділення №3"]
        }), []);

        return { regions, cities, warehouses };
    };
    const { regions, cities, warehouses } = useLocationData();
    useEffect(() => {
        if (orderInfo.region && !cities[orderInfo.region]?.includes(orderInfo.city)) {
            setOrderInfo(prev => ({...prev, city: '', warehouse: ''}));
        }
    }, [orderInfo.region, orderInfo.city, cities]);

    useEffect(() => {
        if (orderInfo.city && !warehouses[orderInfo.city]?.includes(orderInfo.warehouse)) {
            setOrderInfo(prev => ({...prev, warehouse: ''}));
        }
    }, [orderInfo.city, orderInfo.warehouse, warehouses]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;

        setOrderInfo(prev => ({...prev, [name]: value}));

        if (name === 'region') {
            setOrderInfo(prev => ({...prev, region: value, city: '', warehouse: ''}));
        }

        if (name === 'city') {
            setOrderInfo(prev => ({...prev, city: value, warehouse: ''}));
        }

        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({...prev, [name]: ''}));
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        setOrderInfo(prev => ({...prev, [name]: checked}));
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setOrderInfo(prev => ({...prev, [name]: value}));
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;

        setOrderInfo(prev => ({...prev, [name]: value}));

        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({...prev, [name]: ''}));
        }
    };

    const validateForm = () => {
        const newErrors = {
            lastName: orderInfo.lastName ? '' : 'Прізвище обов\'язкове',
            firstName: orderInfo.firstName ? '' : 'Ім\'я обов\'язкове',
            phone: /^\+380\d{9}$/.test(orderInfo.phone) ? '' : 'Введіть коректний номер телефону',
            region: orderInfo.region ? '' : 'Оберіть область',
            city: orderInfo.city ? '' : 'Оберіть місто',
            warehouse: orderInfo.warehouse ? '' : 'Оберіть відділення'
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error);
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const orderId = await createOrder(orderPayload);
        setOrderId(orderId.orderId);
        if (validateForm()) {
            setIsSubmitting(true);

            setTimeout(() => {
                setIsSubmitting(false);
                setIsOrdered(true);
                setIsSubmitted(true);
                // Here you would normally send the orderInfo data to your API
                console.log("orderInfo submitted:", orderInfo);
            }, 1500);
        }
    }

    if (isSubmitted) {
        return (
            <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Замовлення оформлено!</h2>
                    <p className="text-gray-600 mb-6">Дякуємо за ваше замовлення. Номер вашого замовлення: {orderId}</p>
                    <Link href="/">
                        <button
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Повернутися
                        </button>
                    </Link>

                </div>
            </div>
        );
    }

    return (
        <div className="w-1/2 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center mb-6">
                <div className="p-2 bg-blue-100 rounded-full text-blue-600 mr-3">
                    <ShoppingBag size={20} />
                </div>
                <h2 className="text-gray-600 text-2xl font-bold text-gray-800">Оформлення замовлення</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                    <div className="flex items-center mb-4">
                        <div className="p-1 bg-blue-100 rounded-full text-blue-600 mr-2">
                            <User size={16} />
                        </div>
                        <h3 className="text-gray-600 font-semibold text-lg">Дані покупця</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                            name="lastName"
                            value={orderInfo.lastName}
                            onChange={handleTextChange}
                            placeholder="Введіть Прізвище"
                            className="text-gray-600"
                        />
                        <input
                            name="firstName"
                            value={orderInfo.firstName}
                            onChange={handleTextChange}
                            placeholder="Введіть Ім'я"
                            className="text-gray-600"
                        />
                    </div>

                    <input
                        name="phone"
                        value={orderInfo.phone}
                        onChange={handleTextChange}
                        placeholder="+380XXXXXXXXX"
                        className="text-gray-600"
                    />
                </div>

                {/* Delivery Section */}
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                    <div className="flex items-center mb-4">
                        <div className="p-1 bg-blue-100 rounded-full text-blue-600 mr-2">
                            <Truck size={16} />
                        </div>
                        <h3 className="text-gray-600 font-semibold text-lg">Доставка</h3>
                    </div>

                    <div className="flex items-center p-3 mb-5 bg-blue-50 rounded-lg border border-blue-100">
                        <MapPin size={16} className="text-blue-600 mr-2"/>
                        <span className="text-blue-700">Спосіб доставки: Нова Пошта</span>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Область</label>
                            <div className={`relative ${errors.region ? 'has-error' : ''}`}>
                                <select
                                    name="region"
                                    value={orderInfo.region}
                                    onChange={handleSelectChange}
                                    className={`text-gray-600 w-full p-3 pl-10 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all ${
                                        errors.region ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                                >
                                    <option value="">Оберіть область</option>
                                    {regions.map(region => (
                                        <option key={region} value={region}>{region}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <MapPin size={16} className="text-gray-500" />
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                            {errors.region && <p className="mt-1 text-sm text-red-600">{errors.region}</p>}
                        </div>

                        <div>
                            <label className="text-gray-600 block text-sm font-medium text-gray-700 mb-1">Місто</label>
                            <div className={`relative ${errors.city ? 'has-error' : ''}`}>
                                <select
                                    name="city"
                                    value={orderInfo.city}
                                    onChange={handleSelectChange}
                                    disabled={!orderInfo.region}
                                    className={`text-gray-600 w-full p-3 pl-10 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all ${
                                        errors.city ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    } ${!orderInfo.region ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                >
                                    <option className="text-gray-600" value="">
                                        {orderInfo.region ? "Оберіть місто" : "Спочатку виберіть область"}
                                    </option>
                                    {orderInfo.region && cities[orderInfo.region]?.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                        </div>

                        <div>
                            <label className="text-gray-600 block text-sm font-medium text-gray-700 mb-1">Відділення</label>
                            <div className={`relative ${errors.warehouse ? 'has-error' : ''}`}>
                                <select
                                    name="warehouse"
                                    value={orderInfo.warehouse}
                                    onChange={handleSelectChange}
                                    disabled={!orderInfo.city}
                                    className={`text-gray-600 w-full p-3 pl-10 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all ${
                                        errors.warehouse ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    } ${!orderInfo.city ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                >
                                    <option value="">
                                        {orderInfo.city ? "Оберіть відділення" : "Спочатку виберіть місто"}
                                    </option>
                                    {orderInfo.city && warehouses[orderInfo.city]?.map(warehouse => (
                                        <option key={warehouse} value={warehouse}>{warehouse}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                    </svg>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                            {errors.warehouse && <p className="mt-1 text-sm text-red-600">{errors.warehouse}</p>}
                        </div>
                    </div>
                </div>

                {/* Payment Section */}
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                    <div className="flex items-center mb-4">
                        <div className="p-1 bg-blue-100 rounded-full text-blue-600 mr-2">
                            <CreditCard size={16} />
                        </div>
                        <h3 className="text-gray-600 font-semibold text-lg">Оплата</h3>
                    </div>

                    <div className="space-y-3">
                        <label
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${orderInfo.payment === 'cod' ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-100'}`}>
                            <input
                                type="radio"
                                name="payment"
                                value="cod"
                                checked={orderInfo.payment === 'cod'}
                                onChange={handleRadioChange}
                                className="text-gray-600 h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <div className="ml-2 flex items-center">
                                <svg className="text-gray-600 w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                                <span className="text-gray-600">Оплата при отриманні</span>
                            </div>
                        </label>

                        <label
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${orderInfo.payment === 'card' ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-100'}`}>
                            <input
                                type="radio"
                                name="payment"
                                value="card"
                                checked={orderInfo.payment === 'card'}
                                onChange={handleRadioChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <div className="ml-2 flex items-center">
                                <svg className="text-gray-600 w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                                </svg>
                                <span className="text-gray-600">Оплатити карткою Visa/MasterCard</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                    <div className="flex items-center mb-4">
                        <div className="p-1 bg-blue-100 rounded-full text-blue-600 mr-2">
                            <MessageSquare size={16} />
                        </div>
                        <h3 className="text-gray-600 font-semibold text-lg">Коментар</h3>
                    </div>

                    <div className="relative">
                        <textarea
                            name="comment"
                            value={orderInfo.comment}
                            onChange={handleTextChange}
                            placeholder="Коментар до замовлення (необов'язково)"
                            className="text-gray-600 w-full p-3 pl-10 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                        />
                        <div className="absolute top-3 left-3 text-gray-500">
                            <MessageSquare size={16} />
                        </div>
                    </div>
                </div>

                {/* Registration Option */}
                <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">
                    <label className="flex items-center cursor-pointer w-full">
                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                name="register"
                                checked={orderInfo.register}
                                onChange={handleCheckboxChange}
                                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                            />
                            <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${orderInfo.register ? 'opacity-100' : 'opacity-0'}`}>
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="ml-2 flex items-center">
                            <User size={16} className="text-blue-600 mr-2" />
                            <span className="text-blue-800">Хочу зареєструватися для майбутніх покупок</span>
                        </div>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center space-x-2 p-4 rounded-lg font-medium text-white transition-all ${
                        isSubmitting
                            ? 'bg-blue-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-1'
                    }`}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                 fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Обробка...</span>
                        </>
                    ) : (
                        <>
                            <ShoppingBag size={20} className="mr-2"/>
                            <span>Оформити замовлення</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default DetailOrderBar;