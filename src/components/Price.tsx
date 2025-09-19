interface Props {
  amount: number;
  className?: string;
}

const Price = ({ amount, className }: Props) => {
  // Format the amount as currency
  const priceFormat = new Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD", // Set to USD for formatting purposes
    maximumFractionDigits: 2,
  });

  // Manually add NGN symbol to the formatted price string
  const nairaPrice = `₦${priceFormat.replace("$", "").trim()}`;

  return <span className={`${className}`}>{nairaPrice}</span>;
};

export default Price;
