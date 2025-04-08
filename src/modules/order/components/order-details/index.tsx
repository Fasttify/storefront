import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div>
      <Text>
        Hemos enviado los detalles de la confirmación del pedido a{" "}
        <span
          className="text-ui-fg-medium-plus font-semibold"
          data-testid="order-email"
        >
          {order.email}
        </span>
        .<br />
        Tu pago está actualmente <strong>pendiente</strong>. Por favor, espera a
        que el dueño de la tienda lo apruebe una vez reciba tu transferencia. El
        vendedor se pondrá en contacto contigo para enviarte los datos donde
        debes realizar el pago.
      </Text>
      <Text className="mt-2">
        Fecha del pedido:{" "}
        <span data-testid="order-date">
          {new Date(order.created_at).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
      </Text>

      <Text className="mt-2 text-ui-fg-interactive">
        Número de orden: <span data-testid="order-id">{order.display_id}</span>
      </Text>

      <div className="flex items-center text-compact-small gap-x-4 mt-4">
        {showStatus && (
          <>
            <Text>
              Estado del pedido:{" "}
              <span className="text-ui-fg-subtle " data-testid="order-status">
                {/* TODO: Check where the statuses should come from */}
                {formatStatus(order.fulfillment_status)} 
              </span>
            </Text>
            <Text>
              Estado del pago:{" "}
              <span
                className="text-ui-fg-subtle "
                sata-testid="order-payment-status"
              >
                {formatStatus(order.payment_status)} 
              </span>
            </Text>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
