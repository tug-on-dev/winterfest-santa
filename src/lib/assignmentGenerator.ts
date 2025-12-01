import { Participant, Gift, Assignment } from "@/types";

/**
 * Generates Secret Santa assignments using the Fisher-Yates shuffle algorithm
 * to ensure each participant is assigned a unique recipient (no one gets themselves)
 */
export function generateAssignments(
  participants: Participant[],
  gifts: Gift[]
): Assignment[] {
  if (participants.length < 2) {
    throw new Error("Need at least 2 participants");
  }
  if (gifts.length === 0) {
    throw new Error("Need at least 1 gift");
  }

  // Create a derangement (permutation where no element appears in its original position)
  const shuffled = derangement([...participants]);

  // Create assignments with random gift selection
  return participants.map((santa, index) => ({
    santaId: santa.id,
    recipientId: shuffled[index].id,
    giftId: gifts[Math.floor(Math.random() * gifts.length)].id,
  }));
}

/**
 * Creates a derangement (permutation where no element appears in its original position)
 * using the Sattolo algorithm variation
 */
function derangement<T>(arr: T[]): T[] {
  const result = [...arr];
  const n = result.length;

  // Simple approach: keep shuffling until we get a valid derangement
  // For small arrays this is efficient enough
  let attempts = 0;
  const maxAttempts = 1000;

  while (attempts < maxAttempts) {
    // Fisher-Yates shuffle
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }

    // Check if it's a valid derangement
    let isValid = true;
    for (let i = 0; i < n; i++) {
      if (result[i] === arr[i]) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      return result;
    }
    attempts++;
  }

  // Fallback: manual derangement by rotating
  return [...result.slice(1), result[0]];
}
