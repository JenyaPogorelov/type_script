export class Place {
  constructor(
    private readonly provider: string,
    public readonly originalId: string,
    public readonly name: string,
  ) {}
}
