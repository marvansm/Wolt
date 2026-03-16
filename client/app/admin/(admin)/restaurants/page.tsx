"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@/providers/TanstackQueryProvider";
import api from "@/services/api";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    X,
    Star,
    Bike,
    Image as ImageIcon,
    MapPin,
    Utensils,
    Package
} from "lucide-react";

export default function RestaurantsPage() {

    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRestaurant, setEditingRestaurant] = useState<any>(null);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [uploadingBanner, setUploadingBanner] = useState(false);
    const [formData, setFormData] = useState<any>({
        name: "",
        description: "",
        image: "",
        banner: "",
        avatar: "",
        rating: 9.0,
        deliveryTime: "30-40",
        deliveryFee: "0.00",
        minOrderAmount: 10,
        priceRange: "$$$$",
        address: "",
        menu: []
    });

    const { data: restaurants = [], isLoading } = useQuery({
        queryKey: ["restaurants"],
        queryFn: () => api.getData("/restaurants"),
    });

    const createMutation = useMutation({
        mutationFn: (newRestaurant: any) => api.PostData("/restaurants", newRestaurant),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["restaurants"] });
            setIsModalOpen(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, restaurant }: { id: string; restaurant: any }) =>
            api.PatchData(`/restaurants/${id}`, restaurant),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["restaurants"] });
            setIsModalOpen(false);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => api.DeleteData(`/restaurants/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["restaurants"] });
        },
    });

    const handleOpenModal = (restaurant: any = null) => {
        if (restaurant) {
            setEditingRestaurant(restaurant);
            setFormData({
                ...restaurant,
                menu: restaurant.menu || []
            });
        } else {
            setEditingRestaurant(null);
            setFormData({
                name: "",
                description: "",
                image: "",
                banner: "",
                avatar: "",
                rating: 9.0,
                deliveryTime: "30-40",
                deliveryFee: "0.00",
                minOrderAmount: 10,
                priceRange: "$$$$",
                address: "",
                menu: []
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        if (editingRestaurant) {
            updateMutation.mutate({ id: editingRestaurant._id, restaurant: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this restaurant?")) {
            deleteMutation.mutate(id);
        }
    };

    const addMenuItem = () => {
        setFormData({
            ...formData,
            menu: [...formData.menu, { name: "", price: 0, originalPrice: 0, description: "", image: "", weight: "", unitPrice: "", badge: "" }]
        });
    };

    const removeMenuItem = (index: number) => {
        const newMenu = [...formData.menu];
        newMenu.splice(index, 1);
        setFormData({ ...formData, menu: newMenu });
    };

    const updateMenuItem = (index: number, field: string, value: any) => {
        const newMenu = [...formData.menu];
        newMenu[index] = { ...newMenu[index], [field]: value };
        setFormData({ ...formData, menu: newMenu });
    };

    const handleCloudinaryUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'banner') => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (type === 'avatar') setUploadingAvatar(true);
        else setUploadingBanner(true);

        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            const res = await fetch("http://localhost:3001/upload", {
                method: "POST",
                body: uploadData,
            });

            if (!res.ok) {
                throw new Error("Upload failed");
            }

            const data = await res.json();
            setFormData((prev: any) => ({ ...prev, [type]: data.secure_url }));
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            alert("Failed to upload image to Cloudinary.");
        } finally {
            if (type === 'avatar') setUploadingAvatar(false);
            else setUploadingBanner(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight">Restaurants</h1>
                    <p className="text-[#a3a3a3]">Manage partnered restaurants and their profiles.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#009de0] hover:bg-[#0088c2] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all duration-200"
                >
                    <Plus size={20} />
                    Add Restaurant
                </button>
            </div>

            <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1f1f1f] bg-[#141414]/50 flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]" size={18} />
                        <input
                            type="text"
                            placeholder="Search restaurants..."
                            className="w-full bg-[#1f1f1f] border border-[#2b2b2b] rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#009de0]"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#141414] text-[#a3a3a3] text-xs uppercase tracking-wider font-bold">
                                <th className="px-6 py-4">Restaurant</th>
                                <th className="px-6 py-4">Rating</th>
                                <th className="px-6 py-4">Delivery</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1f1f1f]">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-[#737373]">Loading restaurants...</td>
                                </tr>
                            ) : restaurants.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-[#737373]">No restaurants found.</td>
                                </tr>
                            ) : restaurants.map((restaurant: any) => (
                                <tr key={restaurant._id} className="hover:bg-[#141414] transition-colors duration-200 group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-[#1f1f1f] flex items-center justify-center overflow-hidden border border-[#2b2b2b]">
                                                {restaurant.avatar || restaurant.image ? (
                                                    <img src={restaurant.avatar || restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <ImageIcon size={20} className="text-[#404040]" />
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold">{restaurant.name}</span>
                                                <span className="text-[#737373] text-xs truncate max-w-[200px]">{restaurant.description}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 bg-[#1f1f1f] w-fit px-2 py-1 rounded-lg border border-[#2b2b2b]">
                                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                            <span className="font-bold text-sm">{Number(restaurant.rating || 0).toFixed(1)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-1.5 text-sm font-medium">
                                                <Bike size={14} className="text-[#009de0]" />
                                                AZN {restaurant.deliveryFee}
                                            </div>
                                            <span className="text-[#737373] text-[10px] uppercase font-bold tracking-tighter">
                                                {restaurant.deliveryTime} min
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-[#a3a3a3] font-mono">{restaurant.priceRange}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleOpenModal(restaurant)}
                                                className="p-2 hover:bg-[#1f1f1f] rounded-lg text-blue-500 transition-colors"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(restaurant._id)}
                                                className="p-2 hover:bg-[#1f1f1f] rounded-lg text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-[#0a0a0a] border border-[#1f1f1f] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl my-8">
                        <div className="p-6 border-b border-[#1f1f1f] flex justify-between items-center bg-[#0a0a0a] sticky top-0 z-10">
                            <h3 className="text-xl font-bold">{editingRestaurant ? "Edit Restaurant" : "Add Restaurant"}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-[#737373] hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 space-y-2">
                                    <label className="text-sm font-bold text-[#a3a3a3]">Restaurant Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-[#141414] border border-[#1f1f1f] rounded-xl px-4 py-3"
                                    />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <label className="text-sm font-bold text-[#a3a3a3]">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-[#141414] border border-[#1f1f1f] rounded-xl px-4 py-3 resize-none h-20"
                                    />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <label className="text-sm font-bold text-[#a3a3a3]">Avatar Image</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={formData.avatar || formData.image || ""}
                                            onChange={(e) => setFormData({ ...formData, avatar: e.target.value, image: e.target.value })}
                                            placeholder="Paste URL..."
                                            className="flex-1 bg-[#141414] border border-[#1f1f1f] rounded-xl px-4 py-3"
                                        />
                                        <div className="relative">
                                            <input 
                                                type="file" 
                                                accept="image/*"
                                                onChange={(e) => handleCloudinaryUpload(e, 'avatar')}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                disabled={uploadingAvatar}
                                            />
                                            <button 
                                                type="button"
                                                className="bg-[#1f1f1f] hover:bg-[#2b2b2b] text-white px-4 py-3 rounded-xl border border-[#2b2b2b] transition-colors whitespace-nowrap min-w-[100px]"
                                                disabled={uploadingAvatar}
                                            >
                                                {uploadingAvatar ? "Uploading..." : "Upload File"}
                                            </button>
                                        </div>
                                    </div>
                                    {formData.avatar && (
                                        <div className="mt-2 w-16 h-16 rounded-xl bg-[#141414] border border-[#1f1f1f] overflow-hidden">
                                            <img src={formData.avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <label className="text-sm font-bold text-[#a3a3a3]">Banner Image</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={formData.banner || ""}
                                            onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
                                            placeholder="Paste URL..."
                                            className="flex-1 bg-[#141414] border border-[#1f1f1f] rounded-xl px-4 py-3"
                                        />
                                        <div className="relative">
                                            <input 
                                                type="file" 
                                                accept="image/*"
                                                onChange={(e) => handleCloudinaryUpload(e, 'banner')}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                disabled={uploadingBanner}
                                            />
                                            <button 
                                                type="button"
                                                className="bg-[#1f1f1f] hover:bg-[#2b2b2b] text-white px-4 py-3 rounded-xl border border-[#2b2b2b] transition-colors whitespace-nowrap min-w-[100px]"
                                                disabled={uploadingBanner}
                                            >
                                                {uploadingBanner ? "Uploading..." : "Upload File"}
                                            </button>
                                        </div>
                                    </div>
                                    {formData.banner && (
                                        <div className="mt-2 w-full h-24 rounded-xl bg-[#141414] border border-[#1f1f1f] overflow-hidden">
                                            <img src={formData.banner} alt="Banner Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <label className="text-sm font-bold text-[#a3a3a3] flex items-center gap-2">
                                        <MapPin size={14} /> Address
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        placeholder="e.g. 123 Main St, Baku"
                                        className="w-full bg-[#141414] border border-[#1f1f1f] rounded-xl px-4 py-3"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#a3a3a3]">Rating</label>
                                    <input
                                        type="number" step="0.1" max="10"
                                        value={formData.rating}
                                        onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                                        className="w-full bg-[#141414] border border-[#1f1f1f] rounded-xl px-4 py-3 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#a3a3a3]">Price Range</label>
                                    <select
                                        value={formData.priceRange}
                                        onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                                        className="w-full bg-[#141414] border border-[#1f1f1f] rounded-xl px-4 py-3 text-white"
                                    >
                                        <option value="$">$</option>
                                        <option value="$$">$$</option>
                                        <option value="$$$">$$$</option>
                                        <option value="$$$$">$$$$</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#a3a3a3]">Delivery Fee (AZN)</label>
                                    <input
                                        type="text"
                                        value={formData.deliveryFee}
                                        onChange={(e) => setFormData({ ...formData, deliveryFee: e.target.value })}
                                        className="w-full bg-[#141414] border border-[#1f1f1f] rounded-xl px-4 py-3"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#a3a3a3]">Min Order Amount (AZN)</label>
                                    <input
                                        type="number" step="0.1"
                                        value={formData.minOrderAmount || ''}
                                        onChange={(e) => setFormData({ ...formData, minOrderAmount: parseFloat(e.target.value) })}
                                        placeholder="e.g. 10"
                                        className="w-full bg-[#141414] border border-[#1f1f1f] rounded-xl px-4 py-3 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#a3a3a3]">Delivery Time (min)</label>
                                    <input
                                        type="text"
                                        value={formData.deliveryTime}
                                        onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                                        placeholder="e.g. 25-35"
                                        className="w-full bg-[#141414] border border-[#1f1f1f] rounded-xl px-4 py-3"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-[#1f1f1f] pb-2">
                                    <h4 className="font-bold flex items-center gap-2">
                                        <Utensils size={18} /> Menu Items
                                    </h4>
                                    <button
                                        onClick={addMenuItem}
                                        className="text-[#009de0] hover:text-[#0088c2] text-sm font-bold flex items-center gap-1"
                                    >
                                        <Plus size={14} /> Add Item
                                    </button>
                                </div>
                                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                                    {formData.menu.length === 0 ? (
                                        <div className="text-center py-8 border-2 border-dashed border-[#1f1f1f] rounded-xl">
                                            <Package size={32} className="mx-auto text-[#2b2b2b] mb-2" />
                                            <p className="text-[#737373] text-sm">No menu items added yet.</p>
                                        </div>
                                    ) : formData.menu.map((item: any, index: number) => (
                                        <div key={index} className="p-4 bg-[#141414] border border-[#1f1f1f] rounded-xl space-y-3 relative group/item">
                                            <button
                                                onClick={() => removeMenuItem(index)}
                                                className="absolute top-2 right-2 text-[#737373] hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity z-10"
                                            >
                                                <X size={16} />
                                            </button>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                <div className="col-span-2 space-y-1">
                                                    <label className="text-[10px] font-bold text-[#737373] uppercase">Item Name</label>
                                                    <input
                                                        type="text"
                                                        value={item.name || ''}
                                                        onChange={(e) => updateMenuItem(index, 'name', e.target.value)}
                                                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2 text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-[#737373] uppercase">Price (AZN)</label>
                                                    <input
                                                        type="number" step="0.01"
                                                        value={item.price || 0}
                                                        onChange={(e) => updateMenuItem(index, 'price', parseFloat(e.target.value))}
                                                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2 text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-[#737373] uppercase">Original Price</label>
                                                    <input
                                                        type="number" step="0.01"
                                                        value={item.originalPrice || 0}
                                                        onChange={(e) => updateMenuItem(index, 'originalPrice', parseFloat(e.target.value))}
                                                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2 text-sm"
                                                    />
                                                </div>
                                                <div className="col-span-2 md:col-span-4 space-y-1">
                                                    <label className="text-[10px] font-bold text-[#737373] uppercase">Image URL</label>
                                                    <input
                                                        type="text"
                                                        value={item.image || ''}
                                                        onChange={(e) => updateMenuItem(index, 'image', e.target.value)}
                                                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2 text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-[#737373] uppercase">Weight (e.g. 9.5 kg)</label>
                                                    <input
                                                        type="text"
                                                        value={item.weight || ''}
                                                        onChange={(e) => updateMenuItem(index, 'weight', e.target.value)}
                                                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2 text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-[#737373] uppercase">Unit Price</label>
                                                    <input
                                                        type="text"
                                                        value={item.unitPrice || ''}
                                                        placeholder="e.g. AZN 1.89/kg"
                                                        onChange={(e) => updateMenuItem(index, 'unitPrice', e.target.value)}
                                                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2 text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-[#737373] uppercase">Badge</label>
                                                    <input
                                                        type="text"
                                                        value={item.badge || ''}
                                                        placeholder="e.g. 5 left"
                                                        onChange={(e) => updateMenuItem(index, 'badge', e.target.value)}
                                                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2 text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-1 md:col-span-1">
                                                    <label className="text-[10px] font-bold text-[#737373] uppercase">Description</label>
                                                    <input
                                                        type="text"
                                                        value={item.description || ''}
                                                        onChange={(e) => updateMenuItem(index, 'description', e.target.value)}
                                                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2 text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-[#141414] border-t border-[#1f1f1f] flex gap-3 sticky bottom-0 z-10">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 px-6 py-3 rounded-xl font-bold border border-[#2b2b2b] hover:bg-[#1f1f1f]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={createMutation.isPending || updateMutation.isPending}
                                className="flex-1 px-6 py-3 rounded-xl font-bold bg-[#009de0] hover:bg-[#0088c2] transition-colors disabled:opacity-50"
                            >
                                {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save Restaurant"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
