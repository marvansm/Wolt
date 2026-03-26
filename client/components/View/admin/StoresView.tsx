"use client";

import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@/providers/TanstackQueryProvider";
import api from "@/services/api";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Image as ImageIcon,
  Star,
} from "lucide-react";

export default function StoresPageView() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<any>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: "",
    image: "",
    isSponsored: false,
    hasWoltPlus: true,
  });

  const { data: stores = [], isLoading } = useQuery({
    queryKey: ["stores"],
    queryFn: () => api.getData("/stores"),
  });

  const createMutation = useMutation({
    mutationFn: (newStore: any) => api.PostData("/stores", newStore),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
      setIsModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, store }: { id: string; store: any }) =>
      api.PatchData(`/stores/${id}`, store),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
      setIsModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.DeleteData(`/stores/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });

  const handleOpenModal = (store: any = null) => {
    if (store) {
      setEditingStore(store);
      setFormData({ ...store });
    } else {
      setEditingStore(null);
      setFormData({
        name: "",
        image: "",
        isSponsored: false,
        hasWoltPlus: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (editingStore) {
      updateMutation.mutate({ id: editingStore._id, store: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const res = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: uploadData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setFormData((prev: any) => ({ ...prev, image: data.secure_url }));
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Stores</h1>
          <p className="text-[#a3a3a3]">
            Manage popular stores for the discovery page.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-[#009de0] hover:bg-[#0088c2] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all duration-200"
        >
          <Plus size={20} />
          Add Store
        </button>
      </div>

      <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-[#1f1f1f] bg-[#141414]/50 flex items-center gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]"
              size={18}
            />
            <input
              type="text"
              placeholder="Search stores..."
              className="w-full bg-[#1f1f1f] border border-[#2b2b2b] rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#009de0]"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#141414] text-[#a3a3a3] text-xs uppercase tracking-wider font-bold">
                <th className="px-6 py-4">Store</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Wolt+</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1f1f]">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-[#737373]"
                  >
                    Loading stores...
                  </td>
                </tr>
              ) : stores.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-[#737373]"
                  >
                    No stores found.
                  </td>
                </tr>
              ) : (
                stores.map((store: any) => (
                  <tr
                    key={store._id}
                    className="hover:bg-[#141414] transition-colors duration-200 group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[#1f1f1f] flex items-center justify-center overflow-hidden border border-[#2b2b2b]">
                          {store.image ? (
                            <img
                              src={store.image}
                              alt={store.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon size={20} className="text-[#404040]" />
                          )}
                        </div>
                        <span className="font-bold">{store.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {store.isSponsored ? (
                        <span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded-md text-[10px] uppercase font-bold">
                          Sponsored
                        </span>
                      ) : (
                        <span className="text-[#737373] text-[10px] uppercase font-bold">
                          Standard
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {store.hasWoltPlus ? (
                        <span className="text-[#009de0] font-bold text-sm">
                          Yes
                        </span>
                      ) : (
                        <span className="text-[#737373] text-sm">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenModal(store)}
                          className="p-2 hover:bg-[#1f1f1f] rounded-lg text-blue-500 transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(store._id)}
                          className="p-2 hover:bg-[#1f1f1f] rounded-lg text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-[#1f1f1f] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-[#1f1f1f] flex justify-between items-center">
              <h3 className="text-xl font-bold">
                {editingStore ? "Edit Store" : "Add Store"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#737373] hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#a3a3a3]">
                    Store Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-[#141414] border border-[#1f1f1f] rounded-xl px-4 py-3"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#a3a3a3]">
                    Logo / Image
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="Paste URL..."
                    className="w-full bg-[#141414] border border-[#1f1f1f] rounded-xl px-4 py-3 mb-2"
                  />
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={uploadingImage}
                    />
                    <button className="w-full bg-[#1f1f1f] hover:bg-[#2b2b2b] text-white py-3 rounded-xl border border-[#2b2b2b] transition-colors">
                      {uploadingImage ? "Uploading..." : "Upload Logo"}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#141414] border border-[#1f1f1f] rounded-xl">
                  <span className="font-bold text-sm">Sponsored</span>
                  <input
                    type="checkbox"
                    checked={formData.isSponsored}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isSponsored: e.target.checked,
                      })
                    }
                    className="w-5 h-5 accent-[#009de0]"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-[#141414] border border-[#1f1f1f] rounded-xl">
                  <span className="font-bold text-sm">Wolt+ enabled</span>
                  <input
                    type="checkbox"
                    checked={formData.hasWoltPlus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hasWoltPlus: e.target.checked,
                      })
                    }
                    className="w-5 h-5 accent-[#009de0]"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 bg-[#141414] border-t border-[#1f1f1f] flex gap-3">
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
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving..."
                  : "Save Store"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
