"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import React, { useEffect } from "react";
import discImg1 from "../../../../public/images/today-electronics-offers.jpg";
import discImg2 from "../../../../public/images/today-electronics-offers.jpg";
import discImg3 from "../../../../public/images/pkYjXLHa-Vijay-Sales-The-Grand-Electronics-Sale-2023-1200-x-628.jpg";
import discImg4 from "../../../../public/images/Vijay_Sales_1648883947173_1648883947459.webp";
import discImg5 from "../../../../public/images/Sastodeal-Great-Electronics-Sale.jpg";
import Image from "next/image";

const images = [discImg1, discImg2, discImg3, discImg4, discImg5];

const PopularGoods = () => {
    const [sliderInstanceRef, slider] = useKeenSlider({
        loop: true,
        slides: {
            perView: 1,
        },
    });
    useEffect(() => {
        const interval = setInterval(() => {
            slider.current?.next();
        }, 3000);
        return () => clearInterval(interval);
    }, [slider]);
    return (
        <div className="relative w-full max-w-6xl mx-auto mt-8">
            <div ref={sliderInstanceRef} className="keen-slider rounded-xl overflow-hidden shadow-lg">
                    {images.map((imgSrc, idx) => (
                        <div className="keen-slider__slide" key={idx}>
                            <Image
                                width={700}
                                height={500}
                                src={imgSrc.src}
                                alt={`discount-${idx}`}
                                className="w-full h-80 object-cover"
                            />
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => slider.current?.prev()}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
                >
                    ◀
                </button>
                <button
                    onClick={() => slider.current?.next()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
                >
                    ▶
                </button>
            </div>
    );
};

export default PopularGoods;
