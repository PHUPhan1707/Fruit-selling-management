import React from "react";

const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow-sm cursor-pointer">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4 bg-gray-50">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-green-700 font-bold">{product.price}</p>
                <p className="text-gray-500 text-sm">{product.location}</p>
            </div>
        </div>
    );
};

export default ProductCard;
