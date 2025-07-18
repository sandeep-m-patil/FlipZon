import React from 'react';

interface PriceProps {
  amount: number;
}

const PriceDisplay: React.FC<PriceProps> = ({ amount }) => {
  const formatted = amount.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  });

  return formatted;
};

export default PriceDisplay;


