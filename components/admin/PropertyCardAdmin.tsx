"use client";

import { useState } from "react";
import Image from "next/image";
import { Property } from "@/lib/propertyService";
import { Edit, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { togglePropertyActive, deleteProperty } from "@/lib/propertyService";

interface PropertyCardAdminProps {
  property: Property;
  onEdit: (property: Property) => void;
  onUpdate: () => void;
}

export default function PropertyCardAdmin({ property, onEdit, onUpdate }: PropertyCardAdminProps) {
  const [toggling, setToggling] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleToggleActive = async () => {
    setToggling(true);
    try {
      await togglePropertyActive(property.id, !property.active);
      onUpdate();
    } catch (error) {
      console.error("Error toggling property:", error);
    } finally {
      setToggling(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    
    setDeleting(true);
    try {
      await deleteProperty(property.id);
      onUpdate();
    } catch (error) {
      console.error("Error deleting property:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <Image
          src={property.images[0] || "/images/placeholder.jpg"}
          alt={property.title}
          fill
          className="object-cover"
        />
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
          property.active 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          {property.active ? "Active" : "Inactive"}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-card-foreground mb-1">{property.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{property.location}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-primary">
            {property.price.toLocaleString()} ETB
          </span>
          <span className="text-sm text-muted-foreground">
            {property.pricePerSqm.toLocaleString()} ETB/m²
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-4">
          <div>{property.bedrooms} bed</div>
          <div>{property.bathrooms} bath</div>
          <div>{property.area} m²</div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(property)}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
            >
              <Edit className="w-3 h-3" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </button>
          </div>
          
          <button
            onClick={handleToggleActive}
            disabled={toggling}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {property.active ? (
              <>
                <ToggleRight className="w-4 h-4" />
                Active
              </>
            ) : (
              <>
                <ToggleLeft className="w-4 h-4" />
                Inactive
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
