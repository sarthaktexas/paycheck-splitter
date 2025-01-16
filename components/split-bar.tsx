interface SplitBarProps {
  items: { name: string; amount: number; isPercentage: boolean }[]
  totalAmount: number
  paycheck: number
}

export default function SplitBar({ items, totalAmount, paycheck }: SplitBarProps) {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ]

  const getActualAmount = (item: { amount: number; isPercentage: boolean }): number => {
    return item.isPercentage 
      ? (item.amount / 100) * paycheck 
      : item.amount
  }

  return (
    <div className="h-8 w-full bg-gray-200 rounded-full overflow-hidden">
      {items.map((item, index) => (
        <div
          key={index}
          className={`h-full ${colors[index % colors.length]}`}
          style={{
            width: `${(getActualAmount(item) / paycheck) * 100}%`,
            float: "left",
          }}
          title={`${item.name}: $${getActualAmount(item).toFixed(2)}`}
        />
      ))}
      {totalAmount < paycheck && (
        <div
          className="h-full bg-gray-400"
          style={{
            width: `${((paycheck - totalAmount) / paycheck) * 100}%`,
            float: "left",
          }}
          title={`Unallocated: $${(paycheck - totalAmount).toFixed(2)}`}
        />
      )}
    </div>
  )
}

