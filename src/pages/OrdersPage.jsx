import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
  const { orderNumber } = useParams();        

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFull = async () => {
      try {
        const res = await fetch('https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders');
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        
        const found = data.result.find(o => o.order_number === orderNumber);
        if (found) {
          found.status_string = found.status_string === 'Orden Asignada'
            ? 'In transit'
            : found.status_string === 'Recolección completada'
            ? 'Complete'
            : found.status_string;
        }
        setOrder(found || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFull();
  }, [orderNumber]);

  if (loading)      return <div>Loading details…</div>;
  if (!order)       return <div>Order not found</div>;

  return (
    <div className="order-detail">
      <h1>Order #{order.order_number}</h1>
      <p><strong>Status:</strong> {order.status_string}</p>
      <p><strong>Type:</strong> {order.type}</p>
      {order.destinations.map((d, i) => (
        <div key={i}>
          <h3>{i === 0 ? 'Pickup' : 'Dropoff'}</h3>
          <p>{d.address}</p>
          <p>{new Date(d.start_date || d.startDate).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderDetail;
