import { useState } from 'react';
import { cn } from '@/lib/utils';
import { NextButton } from './NextButton';

interface OrderInputProps {
  product: {
    name: string;
    image_path: string;
  };
  marketplace: string;
  onValidChange: (isValid: boolean) => void;
  onNext: () => void;
}

export function OrderInput({ product, marketplace, onValidChange }: OrderInputProps) {
  const [orderId, setOrderId] = useState('');

  const isValidOrderId = /^\d{3}-\d{7}-\d{7}$/.test(orderId);

  const handleOrderIdChange = (value: string) => {
    setOrderId(value);
    const isValid = /^\d{3}-\d{7}-\d{7}$/.test(value);
    onValidChange(isValid);
  };

    const handleNext = () => {
    if (isValidOrderId) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="text-center">
          <div className="w-40 h-40 mx-auto bg-gray-50 rounded-lg p-2">
            <img
              src={product.image_path}
              alt={product.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNFNUU3RUIiLz48L3N2Zz4=';
              }}
            />
          </div>
          <p className="mt-3 font-medium text-gray-900">
            {product.name}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          What is your {marketplace} Order Number containing {product.name}?*
        </label>
        
        <button
          type="button"
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          onClick={() => window.open('https://www.amazon.in/gp/your-account/order-history', '_blank')}
        >
          Find Your {marketplace} Order Number
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <input
          type="text"
          value={orderId}
          onChange={(e) => handleOrderIdChange(e.target.value)}
          placeholder={`${marketplace} Order Number`}
          className={cn(
            "block w-full rounded-lg border",
            "focus:ring-2 focus:ring-offset-0",
            isValidOrderId
              ? "border-green-300 focus:border-green-500 focus:ring-green-200"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-200",
            "bg-white py-2.5 px-4 text-gray-900"
          )}
          aria-invalid={!isValidOrderId}
          aria-describedby="order-format"
        />
        <p id="order-format" className="text-xs text-gray-500">
          Format: 123-1234567-1234567
        </p>
      </div>
      <NextButton isEnabled={isValidOrderId} onClick={handleNext} />
    </div>
  );
}