const wait = (n: number) => {
    return new Promise((res) => {
        setTimeout(() => res(undefined) , n)
    })
} 

const createSuspender = <T>(p: () => Promise<T>) => {
    let value: T = (undefined as unknown) as T;
    let status: 'pending' | 'fulfilled' = 'pending'
    let suspender = (undefined as unknown) as Promise<void>
    return {
        run(){
            if( !suspender ){
                suspender = p().then((a) => {
                    value = a
                    status = 'fulfilled'
                });
            }
            if( status === "fulfilled"){
                return value
            } else {
                throw suspender
            }
        }
    }
} 

export const suspendFor = <T>(n: number, a: T) => createSuspender(() => wait(n).then(() => a))

export const fromPromise = createSuspender