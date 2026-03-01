'use client';

import { useState } from 'react';
import { Menu, Bell, Settings, LogOut, Home, ShoppingCart, Users, TrendingUp, Search, ChevronDown, Plus, X, MoreVertical, Eye, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface Order {
    id: string;
    restaurant: string;
    customer: string;
    amount: string;
    status: string;
    time: string;
}

interface Restaurant {
    id: number;
    name: string;
    orders: number;
    rating: number;
    status: string;
}

export default function AdminDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | number | null>(null);

    const stats = [
        { icon: ShoppingCart, label: 'Total Orders', value: '2,458', color: 'bg-primary' },
        { icon: TrendingUp, label: 'Revenue', value: '€45,231', color: 'bg-accent' },
        { icon: Users, label: 'Active Restaurants', value: '24', color: 'bg-blue-500' },
        { icon: Star, label: 'Avg Rating', value: '4.8/5.0', color: 'bg-yellow-500' },
    ];

    const orders: Order[] = [
        { id: 'ORD-001', restaurant: 'Italian Kitchen', customer: 'John Doe', amount: '€24.50', status: 'Delivered', time: '2 min ago' },
        { id: 'ORD-002', restaurant: 'Sushi House', customer: 'Jane Smith', amount: '€32.00', status: 'In Transit', time: '5 min ago' },
        { id: 'ORD-003', restaurant: 'Burger & Co', customer: 'Mike Johnson', amount: '€18.75', status: 'Preparing', time: '8 min ago' },
        { id: 'ORD-004', restaurant: 'Pizza Palace', customer: 'Sarah Wilson', amount: '€28.99', status: 'Confirmed', time: '12 min ago' },
    ];

    const restaurants: Restaurant[] = [
        { id: 1, name: 'Italian Kitchen', orders: 245, rating: 4.9, status: 'Active' },
        { id: 2, name: 'Sushi House', orders: 189, rating: 4.7, status: 'Active' },
        { id: 3, name: 'Burger & Co', orders: 156, rating: 4.5, status: 'Active' },
        { id: 4, name: 'Pizza Palace', orders: 198, rating: 4.6, status: 'Active' },
    ];

    const navigationItems = [
        { id: 'overview', label: 'Overview', icon: Home },
        { id: 'orders', label: 'Orders', icon: ShoppingCart },
        { id: 'restaurants', label: 'Restaurants', icon: Users },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    ];

    const handleOrderClick = (order: Order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleStatusChange = (status: string) => {
        console.log('Status changed to:', status);
        setOpenDropdown(null);
    };

    const handleDeleteOrder = (id: string) => {
        console.log('Delete order:', id);
    };

    const handleAddRestaurant = () => {
        setSelectedOrder(null);
        setShowModal(true);
    };

    const handleFilterChange = (filter: string) => {
        console.log('Filter changed:', filter);
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            'Delivered': 'bg-green-100 text-green-800',
            'In Transit': 'bg-blue-100 text-blue-800',
            'Preparing': 'bg-yellow-100 text-yellow-800',
            'Confirmed': 'bg-purple-100 text-purple-800',
            'Active': 'bg-green-100 text-green-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="flex h-screen bg-background text-foreground">
            <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col border-r border-sidebar-border`}>
                <div className="h-16 flex items-center justify-center border-b border-sidebar-border">
                    <div className="text-xl font-bold text-primary">W</div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navigationItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id
                                ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                                : 'hover:bg-sidebar-accent text-sidebar-foreground'
                                }`}
                        >
                            <item.icon size={20} />
                            {sidebarOpen && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-sidebar-border space-y-2">
                    <button onClick={() => console.log('Settings')} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-sidebar-accent transition-colors">
                        <Settings size={20} />
                        {sidebarOpen && <span>Settings</span>}
                    </button>
                    <button onClick={() => console.log('Logout')} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-sidebar-accent transition-colors text-destructive">
                        <LogOut size={20} />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                            <Menu size={24} />
                        </button>
                        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center bg-secondary rounded-lg px-3 py-2 gap-2">
                            <Search size={18} className="text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-0 outline-none text-sm h-auto p-0"
                            />
                        </div>

                        <button onClick={() => console.log('Notifications')} className="p-2 hover:bg-secondary rounded-lg transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
                        </button>

                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold cursor-pointer hover:opacity-80 transition-opacity">
                            A
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-auto bg-background p-6">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {stats.map((stat, idx) => (
                                    <Card key={idx} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-muted-foreground text-sm">{stat.label}</p>
                                                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                                            </div>
                                            <div className={`${stat.color} p-3 rounded-lg text-white`}>
                                                <stat.icon size={24} />
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold mb-4">Orders Timeline</h3>
                                    <div className="h-64 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground">
                                        [Chart Placeholder]
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
                                    <div className="h-64 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground">
                                        [Chart Placeholder]
                                    </div>
                                </Card>
                            </div>

                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold">Recent Orders</h3>
                                    <Button onClick={() => setActiveTab('orders')} variant="outline" size="sm">View All</Button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-border">
                                                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Order ID</th>
                                                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Restaurant</th>
                                                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Customer</th>
                                                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Amount</th>
                                                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
                                                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order) => (
                                                <tr key={order.id} className="border-b border-border hover:bg-secondary transition-colors">
                                                    <td className="py-3 px-4 font-medium">{order.id}</td>
                                                    <td className="py-3 px-4">{order.restaurant}</td>
                                                    <td className="py-3 px-4">{order.customer}</td>
                                                    <td className="py-3 px-4 font-semibold">{order.amount}</td>
                                                    <td className="py-3 px-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <button onClick={() => handleOrderClick(order)} className="p-1 hover:bg-secondary rounded transition-colors">
                                                            <Eye size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="space-y-4">
                            <div className="flex gap-3 flex-col md:flex-row">
                                <Input
                                    placeholder="Search orders..."
                                    value={searchQuery}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                    className="md:w-80"
                                />
                                <div className="flex gap-2">
                                    <Button variant="outline" onClick={() => handleFilterChange('today')}>Today</Button>
                                    <Button variant="outline" onClick={() => handleFilterChange('week')}>Week</Button>
                                    <Button variant="outline" onClick={() => handleFilterChange('month')}>Month</Button>
                                </div>
                            </div>

                            <Card className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-border">
                                                <th className="text-left py-3 px-4 font-semibold">Order ID</th>
                                                <th className="text-left py-3 px-4 font-semibold">Restaurant</th>
                                                <th className="text-left py-3 px-4 font-semibold">Customer</th>
                                                <th className="text-left py-3 px-4 font-semibold">Amount</th>
                                                <th className="text-left py-3 px-4 font-semibold">Status</th>
                                                <th className="text-left py-3 px-4 font-semibold">Time</th>
                                                <th className="text-left py-3 px-4 font-semibold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order) => (
                                                <tr key={order.id} className="border-b border-border hover:bg-secondary transition-colors">
                                                    <td className="py-3 px-4 font-medium">{order.id}</td>
                                                    <td className="py-3 px-4">{order.restaurant}</td>
                                                    <td className="py-3 px-4">{order.customer}</td>
                                                    <td className="py-3 px-4 font-semibold">{order.amount}</td>
                                                    <td className="py-3 px-4">
                                                        <div className="relative">
                                                            <button
                                                                onClick={() => setOpenDropdown(openDropdown === order.id ? null : order.id)}
                                                                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}
                                                            >
                                                                {order.status}
                                                                <ChevronDown size={14} />
                                                            </button>

                                                            {openDropdown === order.id && (
                                                                <div className="absolute top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-10 min-w-max">
                                                                    {['Confirmed', 'Preparing', 'In Transit', 'Delivered'].map((status) => (
                                                                        <button
                                                                            key={status}
                                                                            onClick={() => handleStatusChange(status)}
                                                                            className="w-full text-left px-4 py-2 hover:bg-secondary transition-colors text-sm"
                                                                        >
                                                                            {status}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4 text-muted-foreground">{order.time}</td>
                                                    <td className="py-3 px-4">
                                                        <div className="flex gap-2">
                                                            <button onClick={() => handleOrderClick(order)} className="p-1 hover:bg-secondary rounded transition-colors">
                                                                <Eye size={16} />
                                                            </button>
                                                            <button onClick={() => handleDeleteOrder(order.id)} className="p-1 hover:bg-destructive hover:text-destructive-foreground rounded transition-colors">
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'restaurants' && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <Input
                                    placeholder="Search restaurants..."
                                    value={searchQuery}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                    className="md:w-80"
                                />
                                <Button onClick={handleAddRestaurant} className="gap-2">
                                    <Plus size={18} />
                                    Add Restaurant
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {restaurants.map((restaurant) => (
                                    <Card key={restaurant.id} className="p-6 hover:shadow-lg transition-shadow">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                                                <p className="text-muted-foreground text-sm mt-1">{restaurant.orders} orders</p>
                                            </div>
                                            <button
                                                onClick={() => setOpenDropdown(openDropdown === restaurant.id ? null : restaurant.id)}
                                                className="p-1 hover:bg-secondary rounded transition-colors relative"
                                            >
                                                <MoreVertical size={18} />

                                                {openDropdown === restaurant.id && (
                                                    <div className="absolute right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10 min-w-max">
                                                        <button onClick={() => console.log('Edit', restaurant.id)} className="w-full text-left px-4 py-2 hover:bg-secondary transition-colors text-sm">Edit</button>
                                                        <button onClick={() => console.log('View', restaurant.id)} className="w-full text-left px-4 py-2 hover:bg-secondary transition-colors text-sm">View Details</button>
                                                        <button onClick={() => console.log('Delete', restaurant.id)} className="w-full text-left px-4 py-2 hover:bg-destructive text-destructive transition-colors text-sm">Delete</button>
                                                    </div>
                                                )}
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-muted-foreground text-sm">Rating</span>
                                                <span className="font-semibold">{restaurant.rating}/5.0</span>
                                            </div>
                                            <div>
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(restaurant.status)}`}>
                                                    {restaurant.status}
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold mb-4">Daily Orders</h3>
                                    <div className="h-80 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground">
                                        [Chart Placeholder]
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold mb-4">Top Restaurants</h3>
                                    <div className="h-80 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground">
                                        [Chart Placeholder]
                                    </div>
                                </Card>
                            </div>

                            <Card className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Weekly Revenue</h3>
                                <div className="h-80 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground">
                                    [Chart Placeholder]
                                </div>
                            </Card>
                        </div>
                    )}
                </main>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Card className="w-96 p-6 max-h-96 overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">{selectedOrder ? 'Order Details' : 'Add Restaurant'}</h2>
                            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-secondary rounded transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {selectedOrder ? (
                            <div className="space-y-4">
                                <div>
                                    <p className="text-muted-foreground text-sm">Order ID</p>
                                    <p className="font-semibold">{selectedOrder.id}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Restaurant</p>
                                    <p className="font-semibold">{selectedOrder.restaurant}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Customer</p>
                                    <p className="font-semibold">{selectedOrder.customer}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Amount</p>
                                    <p className="font-semibold text-lg">{selectedOrder.amount}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Status</p>
                                    <p className={`font-semibold inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(selectedOrder.status)}`}>
                                        {selectedOrder.status}
                                    </p>
                                </div>
                                <Button onClick={() => setShowModal(false)} className="w-full mt-6">Close</Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Restaurant Name</label>
                                    <Input placeholder="Enter restaurant name" className="mt-1" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Email</label>
                                    <Input type="email" placeholder="Enter email" className="mt-1" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Phone</label>
                                    <Input placeholder="Enter phone number" className="mt-1" />
                                </div>
                                <Button onClick={() => setShowModal(false)} className="w-full">Add Restaurant</Button>
                            </div>
                        )}
                    </Card>
                </div>
            )}
        </div>
    );
}
