export interface IAuthProvider {
  init(): Promise<void>
  getJwt(): string
  getSubject(): string
}