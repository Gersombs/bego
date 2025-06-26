
import React from 'react';
import TruckIcon from '../assets/icons/truck.svg';
import TrainIcon from '../assets/icons/train.svg';
import PickupIcon from '../assets/icons/pickup.svg';
import DropoffIcon from '../assets/icons/dropoff.svg';
import EyeIcon from '../assets/images/eye.png';

const TransportType = ({ type }) => {
  const iconSrc = type === 'FTL' ? TruckIcon : TrainIcon;
  return (
    <span className="card__transport-type">
      <img src={iconSrc} className="card__icon card__icon--transport" alt={type} />
      {type}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const modifier = status.toLowerCase().replace(/\s+/g, '-');
  return (
    <span className={`card__status card__status--${modifier}`}>
      {status === 'In transit' && <span className="card__status-dot" />}
      {status}
    </span>
  );
};

const LocationSection = ({ label, city, address, date, time, Icon }) => (
  <div className={`card__location card__location--${label.toLowerCase()}`}>
    <div className="card__location-info">
      <img src={Icon} className="card__icon card__icon--location" alt={label} />
      <div className="card__location-text">
        <div className="card__label">{label}</div>
        <div className="card__location-city">{city}</div>
        <div className="card__location-address">{address}</div>
      </div>
    </div>
    <div className="card__datetime">
      <span className="card__date">{date}</span>
      <span className="card__time">{time}</span>
    </div>
  </div>
);

const Card = ({
  orderNumber,
  type,
  status,
  pickup,
  dropoff,
  onPrimaryAction,
  primaryLabel
}) => {
 
  const displayStatus = status === 'Orden Asignada'
    ? 'In transit'
    : status === 'Orden completa'
    ? 'Complete'
    : status;

  return (
    <div className="card">
      <div className="card__header">
        <span className="card__order">Order #{orderNumber}</span>
      </div>
      <div className="card__body">
        {/* Tipo de transporte + estado */}
        <div className="card__transport-type-status">
          <TransportType type={type} />
          <StatusBadge status={displayStatus} />
        </div>

        {/* Secciones Pickup y Dropoff */}
        <div className="card__locations">
          <LocationSection
            label="PICKUP"
            city={pickup.city}
            address={pickup.address}
            date={pickup.date}
            time={pickup.time}
            Icon={PickupIcon}
          />
          <LocationSection
            label="DROPOFF"
            city={dropoff.city}
            address={dropoff.address}
            date={dropoff.date}
            time={dropoff.time}
            Icon={DropoffIcon}
          />
        </div>

        {/* Botones de acción */}
        <div className="card__buttons">
          <button
            className={
              `card__button card__button--secondary ` +
              (displayStatus !== 'In transit' ? 'card__button--invisible' : '')
            }
          >
            It's time to pick up
          </button>

          <button
            className="card__button card__button--primary"
            onClick={onPrimaryAction}
          >
            {primaryLabel}
            <img src={EyeIcon} className="card__icon card__icon--eye" alt="eye" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
