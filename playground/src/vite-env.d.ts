/// <reference types="vite/client" />

declare module 'stylis' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const prefixer: any
}

declare module '*.svg' {
  const content: string
  export default content
}
