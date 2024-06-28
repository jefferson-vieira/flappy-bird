export default abstract class ObjectMapper<T> {
  constructor(readonly props: any) {}

  clone(props: any, ...args: any[]): T {
    return new (this.constructor as any)({ ...this.props, ...props }, ...args);
  }
}
