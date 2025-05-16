"use client";
import React, {useState, useEffect, useMemo} from 'react';
import { User, MapPin, CreditCard, MessageSquare, Truck, ShoppingBag, Check } from 'lucide-react';
import {useModal} from "@/components/LayoutComponents/ModalContext/ModalContext";
const DetailOrderBar = () => {
    const {isLogin, userInfo} = useModal();
    interface InputFieldProps {
        icon?: React.ReactNode;
        label?: string;
        name: string;
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        placeholder?: string;
        type?: string;
        className?: string;
    }
    const [form, setForm] = useState({
        lastName: isLogin && 'payload' in userInfo ? userInfo.payload.lastName : '',
        firstName: isLogin && 'payload' in userInfo ? userInfo.payload.firstName : '',
        phone: isLogin && 'payload' in userInfo ? userInfo.payload.phone_number : '',
        region: '',
        city: '',
        warehouse: '',
        payment: 'cod',
        comment: '',
        register: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const useLocationData = () => {
        const regions = useMemo(() => ["Київська", "Львівська", "Одеська", "Харківська", "Дніпропетровська"], []);

        const cities = useMemo(() => ({
            "Київська": ["Київ", "Бориспіль", "Бровари", "Ірпінь"],
            "Львівська": ["Львів", "Дрогобич", "Стрий", "Червоноград"],
            "Одеська": ["Одеса", "Ізмаїл", "Чорноморськ", "Білгород-Дністровський"],
            "Харківська": ["Харків", "Ізюм", "Лозова", "Чугуїв"],
            "Дніпропетровська": ["Дніпро", "Кривий Ріг", "Кам'янське", "Нікополь"]
        }), []);

        const warehouses = useMemo(() => ({
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
        if (
            form.region &&
            !cities[form.region as keyof typeof cities]?.includes(form.city)
        ) {
            setForm(prev => ({ ...prev, city: '', warehouse: '' }));
        }
    },  [form.region, cities, form.city]);

    useEffect(() => {
        if (
            form.city &&
            !warehouses[form.city as keyof typeof warehouses]?.includes(form.warehouse)
        ) {
            setForm(prev => ({ ...prev, warehouse: '' }));
        }
    }, [form.city, warehouses, form.warehouse]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));

    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1000);

    };

    const InputField: React.FC<InputFieldProps> = ({ icon, label, name, value, placeholder, type = "text" }) => (
        <div className="mb-4">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={handleChange} // використовуємо handleChange, а не onChange з пропсів
                    placeholder={placeholder}
                    className={`w-full p-3 ${icon ? 'pl-10' : 'pl-3'} border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all `}
                />
            </div>
        </div>
    );

    if (isSubmitted) {
        return (
            <div className="w-full bg-white rounded-lg p-4">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                        <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-gray-700 text-2xl font-bold text-gray-800 mb-2">Замовлення оформлено!</h2>
                    <p className="text-gray-600 mb-6">Дякуємо за ваше замовлення. Ми зв&apos;яжемося з вами найближчим часом.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-6xl bg-white rounded-lg">
            <div className="flex items-center mb-4">
                <ShoppingBag className="text-blue-600 mr-3" size={18}/>
                <h2 className="text-xl font-bold text-gray-800">Оформлення замовлення</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center mb-3">
                        <User className="text-blue-600 mr-2" size={16}/>
                        <h3 className="text-gray-700 font-semibold">Дані покупця</h3>
                    </div>

                    <div className="text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <InputField
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            placeholder="Введіть Прізвище"
                        />

                        <InputField
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            placeholder="Введіть Ім'я"
                        />
                    </div>

                    <InputField
                        icon={<User size={16} className="text-gray-700"/>}
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+380XXXXXXXXX"
                        className="text-gray-700"
                    />
                </div>

                {/* Delivery Section */}
                <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center mb-3">
                        <Truck className="text-blue-600 mr-2" size={16}/>
                        <h3 className="text-gray-700 font-semibold">Доставка</h3>
                    </div>

                    <div className="flex items-center p-2 mb-3 bg-blue-50 rounded-lg border border-blue-100">
                        <MapPin size={16} className="text-blue-600 mr-2"/>
                        <span className="text-gray-700 text-blue-700 text-sm">Спосіб доставки: Нова Пошта</span>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Область</label>
                            <select
                                name="region"
                                value={form.region}
                                onChange={handleChange}
                                className={`text-gray-700 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                            >
                                <option className="" value="">Оберіть область</option>
                                {regions.map(region => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Місто</label>
                            <select
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                disabled={!form.region}
                                className={`text-gray-700 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all $`}
                            >
                                <option value="">
                                    {form.region ? "Оберіть місто" : "Спочатку виберіть область"}
                                </option>
                                {form.region && (cities[form.region as keyof typeof cities] || []).map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Відділення</label>
                            <select
                                name="warehouse"
                                value={form.warehouse}
                                onChange={handleChange}
                                disabled={!form.city}
                                className={`text-gray-700 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all `}
                            >
                                <option value="">
                                    {form.city ? "Оберіть відділення" : "Спочатку виберіть місто"}
                                </option>
                                {form.city && (warehouses[form.city as keyof typeof warehouses] || []).map(warehouse => (
                                    <option key={warehouse} value={warehouse}>{warehouse}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Payment Section */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center mb-3">
                            <CreditCard className="text-blue-600 mr-2" size={16}/>
                            <h3 className="text-gray-800 font-semibold">Оплата</h3>
                        </div>

                        <div className="space-y-2">
                            <label
                                className="text-gray-800 flex items-center p-2 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    checked={form.payment === 'cod'}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600"
                                />
                                <span className="text-gray-800 ml-2 text-sm">Оплата при отриманні</span>
                            </label>

                            <label
                                className="text-gray-800 flex items-center p-2 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="card"
                                    checked={form.payment === 'card'}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600"
                                />
                                <span className="ml-2 text-sm">Оплатити карткою Visa/MasterCard</span>
                            </label>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center mb-3">
                            <MessageSquare className="text-blue-600 mr-2" size={16}/>
                            <h3 className="text-gray-800 font-semibold">Коментар</h3>
                        </div>

                        <textarea
                            name="comment"
                            value={form.comment}
                            onChange={handleChange}
                            placeholder="Коментар до замовлення (необов'язково)"
                            className="text-gray-800 w-full p-2 border border-gray-300 rounded-lg h-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                    </div>
                </div>

                {
                    !isLogin ? (
                        <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="register"
                                    checked={form.register}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <span className="text-gray-800 ml-2 text-blue-800 text-sm">Хочу зареєструватися для майбутніх покупок</span>
                            </label>
                        </div>
                    ) : null
                }


                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center space-x-2 p-3 rounded-lg font-medium text-white transition-all ${
                        isSubmitting
                            ? 'bg-blue-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
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
                            <ShoppingBag size={18}/>
                            <span>Оформити замовлення</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default DetailOrderBar;