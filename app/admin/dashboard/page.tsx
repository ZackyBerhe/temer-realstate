"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Property } from "@/lib/propertyService";
import { getProperties } from "@/lib/propertyService";
import PropertyCardAdmin from "@/components/admin/PropertyCardAdmin";
import AddPropertyModal from "@/components/admin/AddPropertyModal";
import { LogOut, Plus } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/admin");
      } else {
        loadProperties();
      }
    });

    return () => unsubscribe();
  }, [router]);

  const loadProperties = async () => {
    try {
      const data = await getProperties();
      setProperties(data);
    } catch (error) {
      console.error("Error loading properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/admin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProperty(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProperty(null);
  };

  const handlePropertyUpdate = () => {
    loadProperties();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Temer Properties List</h1>
              <p className="text-sm text-gray-600">Manage and control your property listings</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddNew}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Property
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No properties found</p>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Your First Property
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCardAdmin
                key={property.id}
                property={property}
                onEdit={handleEdit}
                onUpdate={handlePropertyUpdate}
              />
            ))}
          </div>
        )}
      </div>

      <AddPropertyModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        property={editingProperty}
        onSuccess={handlePropertyUpdate}
      />
    </div>
  );
}
