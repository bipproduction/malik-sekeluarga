'use client'

import { Provider, createStore } from "jotai"

const store = createStore()
export default function LayoutProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>
}