import { useState } from "react";

export const useEditableTitle = () => {
    const [editing, setEditing] = useState(false);

    return {
        editing,
        setEditing,
    }
}