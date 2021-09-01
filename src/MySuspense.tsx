import React, { createContext, useContext, useState } from "react"

type MySuspenseProps = {
    fallback: React.ReactChild,
    children?: React.ReactNode | undefined
}

const SuspenseContext = createContext({
    suspend: (children: React.ReactNode): JSX.Element => <></>,
    suspended: true, 
    setSuspended: (() => {}) as React.Dispatch<React.SetStateAction<boolean>> 
})

export const useMySuspense = () => useContext(SuspenseContext)

const MySuspense = ({ fallback, children }: MySuspenseProps) => {
    const [ suspended, setSuspended ] = useState(true);
    const suspend = (c: React.ReactNode) =>( suspended ? fallback : c) as JSX.Element
    return <SuspenseContext.Provider value={{ suspended, setSuspended, suspend }}>
        {children}
    </SuspenseContext.Provider>
}

export default MySuspense