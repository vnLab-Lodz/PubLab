export type ArrElement<ArrType extends readonly unknown[]> =
  ArrType extends readonly (infer ElementType)[] ? ElementType : never;
