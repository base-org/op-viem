type ShiftTuple<T extends any[]> = T extends [T[0], ...infer R] ? R : never

export type DecoratedAction<T extends (...args: any) => any> = (
  args: ShiftTuple<Parameters<T>>[0],
) => ReturnType<T>
