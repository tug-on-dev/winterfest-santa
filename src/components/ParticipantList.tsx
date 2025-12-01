"use client";

import { useState } from "react";
import { Participant } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Plus, Check, X, Users } from "lucide-react";

interface ParticipantListProps {
  participants: Participant[];
  onAdd: (name: string) => void;
  onEdit: (id: string, name: string) => void;
  onRemove: (id: string) => void;
}

export function ParticipantList({
  participants,
  onAdd,
  onEdit,
  onRemove,
}: ParticipantListProps) {
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    const trimmedName = newName.trim();
    if (!trimmedName) {
      setError("Name cannot be empty");
      return;
    }
    if (
      participants.some(
        (p) => p.name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      setError("Name already exists");
      return;
    }
    onAdd(trimmedName);
    setNewName("");
    setError("");
  };

  const handleEdit = (id: string) => {
    const trimmedName = editingName.trim();
    if (!trimmedName) {
      setError("Name cannot be empty");
      return;
    }
    if (
      participants.some(
        (p) =>
          p.id !== id && p.name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      setError("Name already exists");
      return;
    }
    onEdit(id, trimmedName);
    setEditingId(null);
    setEditingName("");
    setError("");
  };

  const startEditing = (participant: Participant) => {
    setEditingId(participant.id);
    setEditingName(participant.name);
    setError("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName("");
    setError("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Participants
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter participant name"
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <Button onClick={handleAdd} size="icon" aria-label="Add participant">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="space-y-2">
          {participants.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No participants yet. Add some above!
            </p>
          ) : (
            participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center gap-2 p-2 rounded-lg bg-muted/50"
              >
                {editingId === participant.id ? (
                  <>
                    <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleEdit(participant.id);
                        if (e.key === "Escape") cancelEditing();
                      }}
                      className="flex-1"
                      autoFocus
                    />
                    <Button
                      onClick={() => handleEdit(participant.id)}
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
                    <span className="flex-1">{participant.name}</span>
                    <Button
                      onClick={() => startEditing(participant)}
                      size="icon"
                      variant="ghost"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => onRemove(participant.id)}
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
