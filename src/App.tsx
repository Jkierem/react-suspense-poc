import { Suspense, useEffect } from 'react';
import * as T from '@effect-ts/core/Effect'
import * as Cl from '@effect-ts/system/Clock'
import { fromEffect } from './effectComponent';
import { fromPromise, suspendFor } from './suspender';
import MySuspense, { useMySuspense } from './MySuspense';

const ClockT = Cl.HasClock 
const ClockLive = new Cl.LiveClock();

const HelloWorld = () => <div>Hello World!</div>

const HelloComponentEffect = T.delay(3000)(T.unit)
    ['|>'](T.as(HelloWorld))
    ['|>'](T.provideService(ClockT)(ClockLive))

const WaitEffect = fromEffect(HelloComponentEffect)

const suspender = suspendFor(3000,42)
const TheGreatSuspender = () => {
  suspender.run()
  return <HelloWorld />
}

const suspensfulEffect = fromPromise(() => HelloComponentEffect['|>'](T.runPromise))
const EffectSuspender = () => {
  const Comp = suspensfulEffect.run()
  return <Comp />
}

const CustomSuspender = () => {
  const { setSuspended, suspend } = useMySuspense();
  useEffect(() => {
    const id = setTimeout(() => setSuspended(false), 3000)
    return () => clearTimeout(id);
  },[setSuspended])

  return suspend(<HelloWorld />)
}

function App() {
  return <>
    <Suspense fallback={<div>Loading Effect...</div>}>
      <WaitEffect />
    </Suspense>
    <Suspense fallback={<div>Loading The Great Suspender...</div>}>
      <TheGreatSuspender />
    </Suspense>
    <Suspense fallback={<div>Loading Suspensful Effect</div>}>
      <EffectSuspender />
    </Suspense>
    <MySuspense fallback={<div>Loading Custom Suspense</div>}>
      <CustomSuspender />
    </MySuspense>
  </>;
}

export default App;
