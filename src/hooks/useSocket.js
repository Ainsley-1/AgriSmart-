
import { useEffect, useRef, useCallback, useState } from 'react';
import io from 'socket.io-client';

/**
 * Custom Hook for Socket.IO Client
 * Usage: const socket = useSocket();
 */
export const useSocket = () => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('No authentication token found');
      return;
    }

    // Initialize Socket.IO connection
    const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
      auth: {
        token: token
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      transports: ['websocket', 'polling']
    });

    // Connection event
    socket.on('connect', () => {
      console.log('✅ Connected to server');
      setIsConnected(true);
      setConnectionError(null);
    });

    // Disconnection event
    socket.on('disconnect', () => {
      console.log('❌ Disconnected from server');
      setIsConnected(false);
    });

    // Error event
    socket.on('error', (error) => {
      console.error('❌ Socket error:', error);
      setConnectionError(error);
    });

    // Authentication error
    socket.on('connect_error', (error) => {
      console.error('❌ Connection error:', error);
      setConnectionError(error.message);
    });

    socketRef.current = socket;

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return {
    socket: socketRef.current,
    isConnected,
    connectionError
  };
};

/**
 * Socket.IO Service for Frontend
 * Provides methods to emit and listen to socket events
 */
export const socketService = {
  // ============================================
  // ORDER EVENTS
  // ============================================

  /**
   * Emit order created event
   */
  emitOrderCreated: (socket, orderData) => {
    if (socket) {
      socket.emit('order:created', orderData);
    }
  },

  /**
   * Listen for order created confirmation
   */
  onOrderCreated: (socket, callback) => {
    if (socket) {
      socket.on('order:created', callback);
    }
  },

  /**
   * Emit order status update
   */
  emitOrderStatusUpdate: (socket, orderData) => {
    if (socket) {
      socket.emit('order:status:updated', orderData);
    }
  },

  /**
   * Listen for order status updates
   */
  onOrderStatusUpdate: (socket, callback) => {
    if (socket) {
      socket.on('order:status:updated', callback);
    }
  },

  /**
   * Listen for new orders (for farmers)
   */
  onNewOrder: (socket, callback) => {
    if (socket) {
      socket.on('order:new', callback);
    }
  },

  /**
   * Emit order delivered
   */
  emitOrderDelivered: (socket, orderData) => {
    if (socket) {
      socket.emit('order:delivered', orderData);
    }
  },

  /**
   * Listen for order delivered
   */
  onOrderDelivered: (socket, callback) => {
    if (socket) {
      socket.on('order:delivered', callback);
    }
  },

  // ============================================
  // PRODUCT EVENTS
  // ============================================

  /**
   * Emit product added
   */
  emitProductAdded: (socket, productData) => {
    if (socket) {
      socket.emit('product:added', productData);
    }
  },

  /**
   * Listen for new products
   */
  onProductAdded: (socket, callback) => {
    if (socket) {
      socket.on('product:added', callback);
    }
  },

  /**
   * Emit product updated
   */
  emitProductUpdated: (socket, productData) => {
    if (socket) {
      socket.emit('product:updated', productData);
    }
  },

  /**
   * Listen for product updates
   */
  onProductUpdated: (socket, callback) => {
    if (socket) {
      socket.on('product:updated', callback);
    }
  },

  /**
   * Listen for out of stock products
   */
  onProductOutOfStock: (socket, callback) => {
    if (socket) {
      socket.on('product:out-of-stock', callback);
    }
  },

  // ============================================
  // NOTIFICATION EVENTS
  // ============================================

  /**
   * Listen for notifications
   */
  onNotificationReceived: (socket, callback) => {
    if (socket) {
      socket.on('notification:received', callback);
    }
  },

  /**
   * Emit send notification
   */
  emitSendNotification: (socket, notificationData) => {
    if (socket) {
      socket.emit('notification:send', notificationData);
    }
  },

  // ============================================
  // CHAT EVENTS
  // ============================================

  /**
   * Join chat room
   */
  joinChatRoom: (socket, roomData) => {
    if (socket) {
      socket.emit('chat:join', roomData);
    }
  },

  /**
   * Send chat message
   */
  sendChatMessage: (socket, messageData) => {
    if (socket) {
      socket.emit('chat:message', messageData);
    }
  },

  /**
   * Listen for chat messages
   */
  onChatMessageReceived: (socket, callback) => {
    if (socket) {
      socket.on('chat:message:received', callback);
    }
  },

  /**
   * Listen for user joined chat
   */
  onUserJoinedChat: (socket, callback) => {
    if (socket) {
      socket.on('chat:user:joined', callback);
    }
  },

  /**
   * Listen for user left chat
   */
  onUserLeftChat: (socket, callback) => {
    if (socket) {
      socket.on('chat:user:left', callback);
    }
  },

  /**
   * Leave chat room
   */
  leaveChatRoom: (socket, roomData) => {
    if (socket) {
      socket.emit('chat:leave', roomData);
    }
  },

  // ============================================
  // PRESENCE EVENTS
  // ============================================

  /**
   * Emit typing indicator
   */
  emitTyping: (socket, roomData) => {
    if (socket) {
      socket.emit('presence:typing', roomData);
    }
  },

  /**
   * Listen for typing indicator
   */
  onUserTyping: (socket, callback) => {
    if (socket) {
      socket.on('presence:typing', callback);
    }
  },

  /**
   * Emit stopped typing
   */
  emitStoppedTyping: (socket, roomData) => {
    if (socket) {
      socket.emit('presence:stopped-typing', roomData);
    }
  },

  /**
   * Listen for stopped typing
   */
  onUserStoppedTyping: (socket, callback) => {
    if (socket) {
      socket.on('presence:stopped-typing', callback);
    }
  },

  // ============================================
  // TRACKING EVENTS
  // ============================================

  /**
   * Listen for location updates
   */
  onLocationUpdate: (socket, callback) => {
    if (socket) {
      socket.on('tracking:location:updated', callback);
    }
  },

  /**
   * Emit location update
   */
  emitLocationUpdate: (socket, locationData) => {
    if (socket) {
      socket.emit('tracking:location:update', locationData);
    }
  },

  // ============================================
  // USER PRESENCE EVENTS
  // ============================================

  /**
   * Listen for user online status
   */
  onUserOnline: (socket, callback) => {
    if (socket) {
      socket.on('user:online', callback);
    }
  },

  /**
   * Listen for user offline status
   */
  onUserOffline: (socket, callback) => {
    if (socket) {
      socket.on('user:offline', callback);
    }
  },

  // ============================================
  // ANALYTICS EVENTS
  // ============================================

  /**
   * Request analytics update
   */
  requestAnalytics: (socket, analyticsData) => {
    if (socket) {
      socket.emit('analytics:request', analyticsData);
    }
  },

  /**
   * Listen for analytics updates
   */
  onAnalyticsUpdate: (socket, callback) => {
    if (socket) {
      socket.on('analytics:update', callback);
    }
  }
};

export default useSocket;