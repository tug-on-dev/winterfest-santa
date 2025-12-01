"use client";

import { useState } from "react";
import { Gift } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Plus, Check, X, Gift as GiftIcon } from "lucide-react";

interface GiftListProps {
  gifts: Gift[];
  onAdd: (description: string) => void;
  onEdit: (id: string, description: string) => void;
  onRemove: (id: string) => void;
}

export function GiftList({ gifts, onAdd, onEdit, onRemove }: GiftListProps) {
  const [newDescription, setNewDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingDescription, setEditingDescription] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    const trimmedDesc = newDescription.trim();
    if (!trimmedDesc) {
      setError("Description cannot be empty");
      return;
    }
    if (
      gifts.some((g) => g.description.toLowerCase() === trimmedDesc.toLowerCase())
    ) {
      setError("Gift already exists");
      return;
    }
    onAdd(trimmedDesc);
    setNewDescription("");
    setError("");
  };

  const handleEdit = (id: string) => {
    const trimmedDesc = editingDescription.trim();
    if (!trimmedDesc) {
      setError("Description cannot be empty");
      return;
    }
    if (
      gifts.some(
        (g) =>
          g.id !== id &&
          g.description.toLowerCase() === trimmedDesc.toLowerCase()
      )
    ) {
      setError("Gift already exists");
      return;
    }
    onEdit(id, trimmedDesc);
    setEditingId(null);
    setEditingDescription("");
    setError("");
  };

  const startEditing = (gift: Gift) => {
    setEditingId(gift.id);
    setEditingDescription(gift.description);
    setError("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingDescription("");
    setError("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GiftIcon className="h-5 w-5" />
          Magic Electronics from the Future
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter a futuristic gift idea"
            value={newDescription}
            onChange={(e) => {
              setNewDescription(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <Button onClick={handleAdd} size="icon" aria-label="Add gift">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="space-y-2">
          {gifts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No gift ideas yet. Add some above!
            </p>
          ) : (
            gifts.map((gift) => (
              <div
                key={gift.id}
                className="flex items-center gap-2 p-2 rounded-lg bg-muted/50"
              >
                {editingId === gift.id ? (
                  <>
                    <Input
                      value={editingDescription}
                      onChange={(e) => setEditingDescription(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleEdit(gift.id);
                        if (e.key === "Escape") cancelEditing();
                      }}
                      className="flex-1"
                      autoFocus
                    />
                    <Button
                      onClick={() => handleEdit(gift.id)}
                      size="icon"
                      variant="ghost"
                      aria-label="Save"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={cancelEditing}
                      size="icon"
                      variant="ghost"
                      aria-label="Cancel"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <span className="flex-1">{gift.description}</span>
                    <Button
                      onClick={() => startEditing(gift)}
                      size="icon"
                      variant="ghost"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => onRemove(gift.id)}
                      size="icon"
                      variant="ghost"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
