"use client";

import { Assignment, Participant, Gift } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";

interface AssignmentViewProps {
  assignments: Assignment[];
  participants: Participant[];
  gifts: Gift[];
}

export function AssignmentView({
  assignments,
  participants,
  gifts,
}: AssignmentViewProps) {
  const getParticipantName = (id: string) => {
    return participants.find((p) => p.id === id)?.name || "Unknown";
  };

  const getGiftDescription = (id: string) => {
    return gifts.find((g) => g.id === id)?.description || "Unknown gift";
  };

  if (assignments.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Secret Santa Assignments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No assignments yet. Add at least 2 participants and 1 gift, then
            click &quot;Generate Assignments&quot;!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Secret Santa Assignments
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {assignments.map((assignment) => (
          <div
            key={`${assignment.santaId}-${assignment.recipientId}`}
            className="p-4 rounded-lg bg-gradient-to-r from-red-50 to-green-50 dark:from-red-950/30 dark:to-green-950/30 border border-red-100 dark:border-red-900/30"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-red-700 dark:text-red-400">
                {getParticipantName(assignment.santaId)}
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold text-green-700 dark:text-green-400">
                {getParticipantName(assignment.recipientId)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              🎁 Gift suggestion:{" "}
              <span className="font-medium text-foreground">
                {getGiftDescription(assignment.giftId)}
              </span>
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
