export class Reponse<T, U> {
  constructor(public status: number,
              public messages: string[],
              public body: T,
              public body1: U)
  {}
}
