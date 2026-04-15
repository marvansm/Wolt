import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TrackingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private activeTrackings = new Map<string, any>();
  private completedTrackings = new Set<string>();

  handleConnection(client: Socket) {
    console.log(`Client connected socket: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected socket: ${client.id}`);
  }

  @SubscribeMessage('subscribeTracking')
  handleSubscribeTracking(
    @MessageBody() data: { orderId: string, duration?: number },
    @ConnectedSocket() client: Socket,
  ) {
    const { orderId } = data;
    const duration = data.duration || 60000; 
    
    client.join(`order_${orderId}`);
    console.log(`Client ${client.id} joined tracking for order ${orderId}`);


    if (this.completedTrackings.has(orderId)) {
      client.emit('trackingUpdate', {
        orderId,
        progress: 1.0,
        timeLeft: 0,
        status: 'delivered'
      });
      return;
    }

    if (!this.activeTrackings.has(orderId)) {
      let progress = 0;
      const intervalMs = 1000;
      const step = intervalMs / duration;

      const interval = setInterval(() => {
        progress += step;
        if (progress >= 1) {
          progress = 1;
          clearInterval(this.activeTrackings.get(orderId));
          this.activeTrackings.delete(orderId);
          this.completedTrackings.add(orderId);
        }
        
        let status = 'received';
        if (progress > 0.1) status = 'accepted';
        if (progress > 0.3) status = 'preparing';
        if (progress > 0.5) status = 'delivering';
        if (progress >= 1.0) status = 'delivered';

        this.server.to(`order_${orderId}`).emit('trackingUpdate', {
          orderId,
          progress: progress,
          timeLeft: Math.max(0, Math.ceil((1 - progress) * (duration / 1000))),
          status
        });
        
      }, intervalMs);

      this.activeTrackings.set(orderId, interval);
    }
  }
}
