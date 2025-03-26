export type Difficulty = "Easy" | "Medium" | "Hard"

export type Status = "Solved" | "Attempted" | "Not Attempted"

export type Tag = "Array" | "Hash Table" | "Linked List" | "Math" | "Binary Search" | "Divide and Conquer" | "Dynamic Programming" | "Graphs"

export interface Problem {
  id: number
  name: string
  difficulty: Difficulty
  acceptanceRate: number
  tags: Tag[]
  status: Status
}

