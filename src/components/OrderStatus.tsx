import React from 'react';

const OrderStatus = ({ status }: { status: string }) => {
    return (
        <div>
            <span className={`order-status ${status.toLowerCase()}`}>
                {status}
            </span>
        </div>
    );
};

export default OrderStatus;