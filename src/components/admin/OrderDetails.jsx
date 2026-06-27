function OrderDetails({ order }) {
  console.log(order.order_items);
  return (
    <div>
      <h2>سفارش شماره {order.id}</h2>
      <div className="grid grid-cols-[1fr_100px]">
        <section>
          <ul>
            {order.order_items.map((item) => (
              <li key={item.id}>
                <p>{item.id}</p>
              </li>
            ))}
          </ul>
        </section>
        <section>مشخصات مشتری</section>
      </div>
      <section>وضعیت سفارش</section>
    </div>
  );
}

export default OrderDetails;
