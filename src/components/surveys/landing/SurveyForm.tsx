import { useState } from 'react';
import { ProductSelect } from './ProductSelect';
import { OrderInput } from './OrderInput';
import { PromoMessage } from './PromoMessage';
import { SurveyHeader } from './SurveyHeader';
import { BackgroundAnimation } from './BackgroundAnimation';
import { cn } from '@/lib/utils';

interface SurveyFormProps {
  survey: {
    id: string;
    survey_name: string;
    survey_style: 'Simple' | 'WithInfo';
    logo_path: string;
    products: Array<{
      id: string;
      name: string;
      image_path: string;
      thumbnail_path: string;
      marketplace: string;
    }>;
  };
}

export function SurveyForm({ survey }: SurveyFormProps) {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(
    survey.products.length === 1 ? survey.products[0].id : null
  );
  const [isOrderValid, setIsOrderValid] = useState(false);
  const hasMultipleProducts = survey.products.length > 1;

  const selectedProductData = selectedProduct 
    ? survey.products.find(p => p.id === selectedProduct)
    : null;

    const handleNext = () => {
    // Handle next step logic here
    console.log('Moving to next step');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero relative overflow-hidden">
      <BackgroundAnimation />
      <SurveyHeader logo={survey.logo_path} />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className={cn(
          "bg-white/95 backdrop-blur-sm rounded-xl",
          "border border-gray-200",
          "shadow-[0_4px_6px_rgba(0,0,0,0.1)]",
          "p-6 sm:p-8 max-w-md w-full",
          "transform transition-all duration-300"
        )}>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Please share your experience!
            </h1>
            <p className="text-gray-600">
              The process is quick and easy! To begin, please complete the fields below.
            </p>
          </div>

          {survey.survey_style === 'WithInfo' && <PromoMessage />}

          <ProductSelect
            products={survey.products}
            selectedProduct={selectedProduct}
            onSelect={setSelectedProduct}
          />

          {selectedProductData && (
            <div className={cn(
              "mt-6",
              "animate-fade-in"
            )}>
              <OrderInput 
                product={selectedProductData}
                marketplace={selectedProductData.marketplace}
                onValidChange={setIsOrderValid}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}