import { create } from 'zustand'

const useStore = create((set) => ({
    user: {},
    setUser: (user) => set({ user }),
    logout: () => set({ user: {} }),
}))

export default useStore