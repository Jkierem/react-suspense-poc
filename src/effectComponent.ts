import React from "react";
import * as T from '@effect-ts/core/Effect'

export const makeEffect = (comp: () => JSX.Element) => T.unit['|>'](T.as(comp))

const wrapComponent = (comp: () => JSX.Element) => ({ default: (comp as unknown) as React.ComponentType<any>})

export const fromEffect = (eff: T.UIO<() => JSX.Element>) => {
    return React.lazy(() => eff
        ['|>'](T.map(wrapComponent))
        ['|>'](T.runPromise)
    )
}