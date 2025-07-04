"use client"
import React from 'react';

interface EditCategoryPropsType {
    id:string 
}

const EditCategory = ({id}:EditCategoryPropsType) => {
    return (
        <div>
            EditCategory {id}
        </div>
    );
};

export default EditCategory;