"use client";

import React from "react";
import { CategoryType } from "@/Interfaces/categoryInterfaces";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { useCategories } from "@/hooks/useCategory";

// Props with generic
interface CategorySelectProps<T extends FieldValues = FieldValues> {
  control?: Control<T>;
  name?: Path<T>; // more strict type
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

// Generic component
export function CategorySelect<T extends FieldValues = FieldValues>({
  control,
  name,
  placeholder = "Select category",
  className = "",
  value,
  onChange,
}: CategorySelectProps<T>) {
  const { categories, loading } = useCategories();

  const renderOptions = () => (
    <>
      <option value="">
        {loading ? "Loading categories..." : placeholder}
      </option>
      {categories.map((cat: CategoryType) => (
        <option key={cat._id?.toString()} value={cat._id?.toString()}>
          {cat.name}
        </option>
      ))}
    </>
  );

  // Form mode
  if (control && name) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            disabled={loading}
            className={`my-input ${className}`}
          >
            {renderOptions()}
          </select>
        )}
      />
    );
  }

  // Standalone (state-based) mode
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={loading}
      className={`my-input ${className}`}
    >
      {renderOptions()}
    </select>
  );
}

// use form
//  <CategorySelect<ProductType> control={control} name="categoryId" />
// use State
//  <CategorySelect
//  value={selectedCategory}
//  onChange={(value) => setSelectedCategory(value)}
//  placeholder="Filter by category"
//  />
