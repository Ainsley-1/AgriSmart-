import { useEffect, useState } from 'react';
import useSocket, { socketService } from '../hooks/useSocket';

/**
 * Example 1: Real-time Order Tracking Component
 */
export const OrderTrackingSocket = ({ orderId }) => {
  const { socket, isConnected } = useSocket();
  const [orderStatus, setOrderStatus] = useState('pending');
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!socket) return;

    // Listen for order status updates
    socketService.onOrderStatusUpdate(socket, (data) => {
      if (data.order._id === orderId) {
        setOrderStatus(data.order.status);
        console.log('Order status updated:', data.message);
      }
    });

    // Listen for location updates
    socketService.onLocationUpdate(socket, (data) => {
      if (data.orderId === orderId) {
        setLocation({
          latitude: data.latitude,
          longitude: data.longitude,
          address: data.address
        });
      }
    });

    return () => {
      // Cleanup listeners
      socket.off('order:status:updated');
      socket.off('tracking:location:updated');
    };
  }, [socket, orderId]);

  return (
    <div className="order-tracking">
      <h2>Order Tracking</h2>
      <p>Status: <strong>{orderStatus}</strong></p>
      <p>Connection: {isConnected ? '✅ Connected' : '❌ Disconnected'}</p>
      
      {location && (
        <div className="location-info">
          <p>📍 Location: {location.address}</p>
          <p>Coordinates: {location.latitude}, {location.longitude}</p>
        </div>
      )}
    </div>
  );
};

/**
 * Example 2: Real-time Notifications Component
 */
export const NotificationsSocket = () => {
  const { socket, isConnected } = useSocket();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!socket) return;

    // Listen for notifications
    socketService.onNotificationReceived(socket, (notification) => {
      setNotifications(prev => [notification, ...prev]);
      
      // Auto-remove notification after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n !== notification));
      }, 5000);
    });

    return () => {
      socket.off('notification:received');
    };
  }, [socket]);

  return (
    <div className="notifications">
      <h3>Notifications ({notifications.length})</h3>
      {notifications.map((notif, index) => (
        <div key={index} className={`notification ${notif.type}`}>
          <strong>{notif.title}</strong>
          <p>{notif.message}</p>
        </div>
      ))}
    </div>
  );
};

/**
 * Example 3: Real-time Chat Component
 */
export const ChatSocket = ({ roomId, userName }) => {
  const { socket, isConnected } = useSocket();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    if (!socket) return;

    // Join chat room
    socketService.joinChatRoom(socket, { roomId });

    // Listen for messages
    socketService.onChatMessageReceived(socket, (message) => {
      setMessages(prev => [...prev, message]);
    });

    // Listen for user joined
    socketService.onUserJoinedChat(socket, (data) => {
      console.log(data.message);
    });

    // Listen for user left
    socketService.onUserLeftChat(socket, (data) => {
      console.log(data.message);
    });

    // Listen for typing indicators
    socketService.onUserTyping(socket, (data) => {
      setTypingUsers(prev => [...new Set([...prev, data.userId])]);
    });

    socketService.onUserStoppedTyping(socket, (data) => {
      setTypingUsers(prev => prev.filter(id => id !== data.userId));
    });

    return () => {
      socketService.leaveChatRoom(socket, { roomId });
      socket.off('chat:message:received');
      socket.off('chat:user:joined');
      socket.off('chat:user:left');
      socket.off('presence:typing');
      socket.off('presence:stopped-typing');
    };
  }, [socket, roomId]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      socketService.sendChatMessage(socket, {
        roomId,
        message: messageInput,
        senderName: userName
      });
      setMessageInput('');
      socketService.emitStoppedTyping(socket, { roomId });
    }
  };

  const handleTyping = (e) => {
    setMessageInput(e.target.value);
    socketService.emitTyping(socket, { roomId });
  };

  return (
    <div className="chat-container">
      <h3>Chat - {roomId}</h3>
      <p>Connection: {isConnected ? '✅ Connected' : '❌ Disconnected'}</p>

      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.senderName}:</strong> {msg.message}
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>

      {typingUsers.length > 0 && (
        <p className="typing-indicator">
          {typingUsers.join(', ')} is typing...
        </p>
      )}

      <div className="input-area">
        <input
          type="text"
          value={messageInput}
          onChange={handleTyping}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

/**
 * Example 4: Real-time Product Updates Component
 */
export const ProductUpdatesSocket = () => {
  const { socket, isConnected } = useSocket();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!socket) return;

    // Listen for new products
    socketService.onProductAdded(socket, (data) => {
      setProducts(prev => [data.product, ...prev]);
      console.log('New product:', data.message);
    });

    // Listen for product updates
    socketService.onProductUpdated(socket, (data) => {
      setProducts(prev =>
        prev.map(p => p._id === data.product._id ? data.product : p)
      );
    });

    // Listen for out of stock
    socketService.onProductOutOfStock(socket, (data) => {
      console.log(`${data.productName} is out of stock`);
      setProducts(prev =>
        prev.map(p => p._id === data.productId ? { ...p, quantity: 0 } : p)
      );
    });

    return () => {
      socket.off('product:added');
      socket.off('product:updated');
      socket.off('product:out-of-stock');
    };
  }, [socket]);

  return (
    <div className="product-updates">
      <h3>Live Product Updates</h3>
      <p>Connection: {isConnected ? '✅ Connected' : '❌ Disconnected'}</p>
      <p>Total Products: {products.length}</p>

      <div className="products-list">
        {products.map(product => (
          <div key={product._id} className="product-item">
            <h4>{product.name}</h4>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Example 5: Farmer Order Notifications Component
 */
export const FarmerOrderNotificationsSocket = () => {
  const { socket, isConnected } = useSocket();
  const [newOrders, setNewOrders] = useState([]);

  useEffect(() => {
    if (!socket) return;

    // Listen for new orders
    socketService.onNewOrder(socket, (data) => {
      setNewOrders(prev => [data.order, ...prev]);
      console.log('New order received:', data.message);
    });

    // Listen for order status updates
    socketService.onOrderStatusUpdate(socket, (data) => {
      console.log('Order status updated:', data.order.status);
    });

    return () => {
      socket.off('order:new');
      socket.off('order:status:updated');
    };
  }, [socket]);

  return (
    <div className="farmer-orders">
      <h3>New Orders</h3>
      <p>Connection: {isConnected ? '✅ Connected' : '❌ Disconnected'}</p>
      <p>Pending Orders: {newOrders.length}</p>

      <div className="orders-list">
        {newOrders.map(order => (
          <div key={order._id} className="order-item">
            <h4>Order #{order.orderId}</h4>
            <p>Total: ${order.totalAmount}</p>
            <p>Status: {order.status}</p>
            <p>Items: {order.items.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Example 6: User Presence Component
 */
export const UserPresenceSocket = () => {
  const { socket, isConnected } = useSocket();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!socket) return;

    // Listen for user online
    socketService.onUserOnline(socket, (data) => {
      setOnlineUsers(prev => [...prev, data]);
      console.log(`${data.email} is online`);
    });

    // Listen for user offline
    socketService.onUserOffline(socket, (data) => {
      setOnlineUsers(prev => prev.filter(u => u.userId !== data.userId));
      console.log(`${data.userId} is offline`);
    });

    return () => {
      socket.off('user:online');
      socket.off('user:offline');
    };
  }, [socket]);

  return (
    <div className="user-presence">
      <h3>Online Users</h3>
      <p>Connection: {isConnected ? '✅ Connected' : '❌ Disconnected'}</p>
      <p>Total Online: {onlineUsers.length}</p>

      <ul className="users-list">
        {onlineUsers.map(user => (
          <li key={user.userId}>
            {user.email} ({user.role}) 🟢
          </li>
        ))}
      </ul>
    </div>
  );
};

export default {
  OrderTrackingSocket,
  NotificationsSocket,
  ChatSocket,
  ProductUpdatesSocket,
  FarmerOrderNotificationsSocket,
  UserPresenceSocket
};