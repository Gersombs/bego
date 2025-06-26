
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import '../index.css';

export default function OrderList({ activeTab, searchQuery = '' }) {
  const [orders, setOrders]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          'https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming'
        );
        if (!res.ok) throw new Error(res.statusText);
        const { result } = await res.json();
        
        const translatedResult = result.map(order => ({
          ...order,
          status_string: order.status_string === 'Orden Asignada'
            ? 'In transit'
            : order.status_string === 'Recolección completada'
            ? 'Complete'
            : order.status_string
        }));
        setOrders(translatedResult);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (!loading) {
      const sq = (searchQuery || '').toLowerCase();

      const byTab = orders.filter(o => {
        if (activeTab === 'upcoming')  return o.status < 3;
        if (activeTab === 'completed') return o.status === 3 || o.status === 4;
        if (activeTab === 'past')      return o.status === 5;
        return true;
      });

      const bySearch = byTab.filter(o =>
        o.order_number.toLowerCase().includes(sq) ||
        o.type.toLowerCase().includes(sq) ||
        o.status_string.toLowerCase().includes(sq) ||
        o.destinations.some(d =>
          d.address.toLowerCase().includes(sq)
        )
      );

      setFiltered(bySearch);
    }
  }, [orders, loading, activeTab, searchQuery]);

  const formatDate = ts => {
    if (!ts) return '';
    const d = new Date(ts);
    return `${d.getDate().toString().padStart(2, '0')}/${
      (d.getMonth() + 1).toString().padStart(2, '0')
    }/${d.getFullYear().toString().slice(-2)}`;
  };

  const formatTime = ts => {
    if (!ts) return '';
    const d = new Date(ts);
    return `${d.getHours().toString().padStart(2, '0')}:${d
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  };

  const handleResume = orderNumber => {
    navigate(`/orders/${orderNumber}`);
  };

  if (loading) return <div>Loading…</div>;
  if (!filtered.length) return <div>No orders found</div>;

  return (
    <div className="order-list">
      {filtered.map(o => {
        const [pu, doff] = o.destinations;
        return (
          <Card
            key={o._id}
            orderNumber={o.order_number}
            type={o.type}
            status={o.status_string}
            pickup={{
              city: pu.city || pu.address.split(',')[0],
              address: pu.address,
              date: formatDate(pu.start_date),
              time: formatTime(pu.start_date)
            }}
            dropoff={{
              city: doff.city || doff.address.split(',')[0],
              address: doff.address,
              date: formatDate(doff.start_date),
              time: formatTime(doff.start_date)
            }}
            onPrimaryAction={() => handleResume(o.order_number)}
            primaryLabel="Resume"
          />
        );
      })}
    </div>
  );
}
