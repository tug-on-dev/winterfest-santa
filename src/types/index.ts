export interface Participant {
  id: string;
  name: string;
}

export interface Gift {
  id: string;
  description: string;
}

export interface Assignment {
  santaId: string;
  recipientId: string;
  giftId: string;
}
