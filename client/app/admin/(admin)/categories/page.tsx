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
    Grid2X2
} from "lucide-react";

export default function CategoriesPage() {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const [formData, setFormData] = useState({ name: "", image: "", bgColor: "#1f1f1f" });

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => api.getData("/categories"),
    });

    const createMutation = useMutation({
        mutationFn: (newCategory: any) => api.PostData("/categories", newCategory),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            setIsModalOpen(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, category }: { id: string; category: any }) =>
            api.PatchData(`/categories/${id}`, category),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            setIsModalOpen(false);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => api.DeleteData(`/categories/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });

    const handleOpenModal = (category: any = null) => {
        if (category) {
            setEditingCategory(category);
            setFormData({ name: category.name, image: category.image, bgColor: category.bgColor });
        } else {
            setEditingCategory(null);
            setFormData({ name: "", image: "", bgColor: "#1f1f1f" });
        }
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        if (editingCategory) {
            updateMutation.mutate({ id: editingCategory._id, category: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
                    <p className="text-[#a3a3a3]">Manage your menu categories and their appearance.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#009de0] hover:bg-[#0088c2] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all duration-200"
                >
                    <Plus size={20} />
                    Add Category
                </button>
            </div>

            <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1f1f1f] bg-[#141414]/50 flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]" size={18} />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            className="w-full bg-[#1f1f1f] border border-[#2b2b2b] rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#009de0] transition-colors"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#141414] text-[#a3a3a3] text-xs uppercase tracking-wider font-bold">
                                <th className="px-6 py-4">Preview</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Background</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1f1f1f]">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-[#737373]">Loading categories...</td>
                                </tr>
                            ) : categories.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-[#737373]">No categories found.</td>
                                </tr>
                            ) : categories.map((category: any) => (
                                <tr key={category._id} className="hover:bg-[#141414] transition-colors duration-200 group">
                                    <td className="px-6 py-4">
                                        <div
                                            className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden border border-[#1f1f1f]"
                                            style={{ backgroundColor: category.bgColor }}
                                        >
                                            {category.image ? (
                                                <img src={category.image} alt={category.name} className="w-full h-full object-contain" />
                                            ) : (
                                                <Grid2X2 size={24} className="text-white/20" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold">{category.name}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full border border-[#2b2b2b]" style={{ backgroundColor: category.bgColor }} />
                                            <span className="text-[#a3a3a3] font-mono text-sm uppercase">{category.bgColor}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleOpenModal(category)}
                                                className="p-2 hover:bg-[#1f1f1f] rounded-lg text-blue-500 transition-colors"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category._id)}
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#0a0a0a] border border-[#1f1f1f] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-[#1f1f1f] flex justify-between items-center">
                            <h3 className="text-xl font-bold">{editingCategory ? "Edit Category" : "Add Category"}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-[#737373] hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#a3a3a3]">Category Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Restaurants"
                                    className="w-full bg-[#141414] border border-[#1f1f1f] rounded-xl px-4 py-3 focus:outline-none focus:border-[#009de0] transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#a3a3a3]">Image URL</label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://..."
                                    className="w-full bg-[#141414] border border-[#1f1f1f] rounded-xl px-4 py-3 focus:outline-none focus:border-[#009de0] transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#a3a3a3]">Background Color</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={formData.bgColor}
                                        onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                                        className="w-12 h-12 rounded-lg bg-transparent border-none cursor-pointer p-0 overflow-hidden"
                                    />
                                    <input
                                        type="text"
                                        value={formData.bgColor}
                                        onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                                        className="flex-1 bg-[#141414] border border-[#1f1f1f] rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-[#009de0] uppercase"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-[#141414] border-t border-[#1f1f1f] flex gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 px-6 py-3 rounded-xl font-bold border border-[#2b2b2b] hover:bg-[#1f1f1f] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={createMutation.isPending || updateMutation.isPending}
                                className="flex-1 px-6 py-3 rounded-xl font-bold bg-[#009de0] hover:bg-[#0088c2] transition-colors disabled:opacity-50"
                            >
                                {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
