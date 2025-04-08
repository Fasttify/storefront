// This component has been deprecated and should not be used
import { Badge } from "@medusajs/ui"

// This component is disabled and should not be used in production
const PaymentTest = ({ className }: { className?: string }) => {
  console.warn("PaymentTest component is deprecated and should not be used")

  // Return null instead of the actual component to prevent rendering
  return null

  // Original implementation commented out
  /*
  return (
    <Badge color="orange" className={className}>
      <span className="font-semibold">Attention:</span> For testing purposes
      only.
    </Badge>
  )
  */
}

// Export an empty/disabled component
export default PaymentTest
