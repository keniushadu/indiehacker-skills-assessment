'use client'

import { create } from 'zustand'

interface AssessmentState {
  answers: number[]
  setAnswers: (answers: number[]) => void
  clearAnswers: () => void
}

export const useAssessmentStore = create<AssessmentState>((set) => ({
  answers: [],
  setAnswers: (answers) => set({ answers }),
  clearAnswers: () => set({ answers: [] }),
}))
