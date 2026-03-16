export class CreateOrderDto {
  customerName: string;
  total: number;
  status: 'pending' | 'preparing' | 'delivered' | 'cancelled';
  items: string[];
}
