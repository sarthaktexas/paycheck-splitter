"use client"

import { useState } from "react"
import { Plus, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SplitBar from "@/components/split-bar"

interface LineItem {
  name: string
  amount: number
}

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

export default function PaycheckSplitter() {
  const [paycheck, setPaycheck] = useState<number>(0)
  const [lineItems, setLineItems] = useState<LineItem[]>([])

  const addLineItem = () => {
    setLineItems([...lineItems, { name: "", amount: 0 }])
  }

  const updateLineItem = (index: number, field: keyof LineItem, value: string | number) => {
    const updatedItems = [...lineItems]
    updatedItems[index] = { ...updatedItems[index], [field]: field === 'amount' ? Number(value) : value }
    setLineItems(updatedItems)
  }

  const removeLineItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index))
  }

  const totalAmount = lineItems.reduce((sum, item) => sum + item.amount, 0)

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Paycheck Splitter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="paycheck">Paycheck Amount</Label>
          <Input
            id="paycheck"
            type="number"
            value={paycheck || ""}
            onChange={(e) => setPaycheck(Number(e.target.value))}
            placeholder="Enter your paycheck amount"
          />
        </div>

        {paycheck > 0 && (
          <>
            <div className="space-y-4">
              {lineItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={item.name}
                    onChange={(e) => updateLineItem(index, "name", e.target.value)}
                    placeholder="Category name"
                  />
                  <Input
                    type="number"
                    value={item.amount}
                    onChange={(e) => updateLineItem(index, "amount", e.target.value)}
                    placeholder="Amount"
                    className="w-24"
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeLineItem(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button onClick={addLineItem} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Category
              </Button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Split Visualization</h3>
              <SplitBar items={lineItems} totalAmount={totalAmount} paycheck={paycheck} />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Breakdown</h3>
              {lineItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div 
                      className={`w-4 h-4 rounded-full ${colors[index % colors.length]}`}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span>${item.amount.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gray-400" />
                  <span>Unallocated</span>
                </div>
                <span>${(paycheck - totalAmount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              {totalAmount !== paycheck && (
                <p className="text-red-500">
                  Total amount should equal paycheck. Remaining: ${(paycheck - totalAmount).toFixed(2)}
                </p>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

