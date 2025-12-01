"use client";

import { useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Participant, Gift, Assignment } from "@/types";
import { generateAssignments } from "@/lib/assignmentGenerator";
import { ParticipantList } from "@/components/ParticipantList";
import { GiftList } from "@/components/GiftList";
import { AssignmentView } from "@/components/AssignmentView";
import { Button } from "@/components/ui/button";
import { Shuffle, Trash2 } from "lucide-react";

const DEFAULT_GIFTS: Gift[] = [
  { id: "1", description: "Holographic AI Assistant" },
  { id: "2", description: "Neural Interface Headset" },
  { id: "3", description: "Quantum Computing Watch" },
  { id: "4", description: "Teleportation Keychain" },
  { id: "5", description: "Anti-Gravity Hover Shoes" },
  { id: "6", description: "Time Dilation Clock" },
  { id: "7", description: "Universal Translator Earbuds" },
  { id: "8", description: "Molecular Food Synthesizer" },
];

export default function Home() {
  const [participants, setParticipants, participantsHydrated] = useLocalStorage<
    Participant[]
  >("secretsanta-participants", []);
  const [gifts, setGifts, giftsHydrated] = useLocalStorage<Gift[]>(
    "secretsanta-gifts",
    DEFAULT_GIFTS
  );
  const [assignments, setAssignments, assignmentsHydrated] = useLocalStorage<
    Assignment[]
  >("secretsanta-assignments", []);

  const isHydrated = participantsHydrated && giftsHydrated && assignmentsHydrated;

  const generateId = () => Math.random().toString(36).substring(2, 15);

  const addParticipant = useCallback(
    (name: string) => {
      setParticipants((prev) => [...prev, { id: generateId(), name }]);
    },
    [setParticipants]
  );

  const editParticipant = useCallback(
    (id: string, name: string) => {
      setParticipants((prev) =>
        prev.map((p) => (p.id === id ? { ...p, name } : p))
      );
    },
    [setParticipants]
  );

  const removeParticipant = useCallback(
    (id: string) => {
      setParticipants((prev) => prev.filter((p) => p.id !== id));
      // Clear assignments when participants change
      setAssignments([]);
    },
    [setParticipants, setAssignments]
  );

  const addGift = useCallback(
    (description: string) => {
      setGifts((prev) => [...prev, { id: generateId(), description }]);
    },
    [setGifts]
  );

  const editGift = useCallback(
    (id: string, description: string) => {
      setGifts((prev) =>
        prev.map((g) => (g.id === id ? { ...g, description } : g))
      );
    },
    [setGifts]
  );

  const removeGift = useCallback(
    (id: string) => {
      setGifts((prev) => prev.filter((g) => g.id !== id));
    },
    [setGifts]
  );

  const handleGenerateAssignments = useCallback(() => {
    try {
      const newAssignments = generateAssignments(participants, gifts);
      setAssignments(newAssignments);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to generate assignments"
      );
    }
  }, [participants, gifts, setAssignments]);

  const handleClearAll = useCallback(() => {
    if (confirm("Are you sure you want to clear all data?")) {
      setParticipants([]);
      setGifts(DEFAULT_GIFTS);
      setAssignments([]);
    }
  }, [setParticipants, setGifts, setAssignments]);

  const canGenerate = participants.length >= 2 && gifts.length >= 1;

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <p className="text-muted-foreground">
          Manage your Secret Santa event with futuristic gift ideas!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ParticipantList
          participants={participants}
          onAdd={addParticipant}
          onEdit={editParticipant}
          onRemove={removeParticipant}
        />
        <GiftList
          gifts={gifts}
          onAdd={addGift}
          onEdit={editGift}
          onRemove={removeGift}
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          onClick={handleGenerateAssignments}
          disabled={!canGenerate}
          size="lg"
          className="gap-2"
        >
          <Shuffle className="h-5 w-5" />
          Generate Assignments
        </Button>
        <Button
          onClick={handleClearAll}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <Trash2 className="h-5 w-5" />
          Clear All Data
        </Button>
      </div>

      {!canGenerate && (
        <p className="text-center text-muted-foreground text-sm">
          Add at least 2 participants and 1 gift to generate assignments
        </p>
      )}

      <AssignmentView
        assignments={assignments}
        participants={participants}
        gifts={gifts}
      />
    </div>
  );
}
