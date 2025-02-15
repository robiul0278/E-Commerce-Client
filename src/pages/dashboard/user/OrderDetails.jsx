import useMyOrder from "../../../hooks/useMyOrder";

const OrderDetails = () => {
const [myOrder] = useMyOrder();
console.log(myOrder);
  
  return (
    <div>OrderDetails</div>
  )
}

export default OrderDetails;