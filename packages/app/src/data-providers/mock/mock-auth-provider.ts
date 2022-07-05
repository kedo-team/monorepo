import { IAuthProvider } from '../interfaces';

export class MockAuthProvider implements IAuthProvider {
  init(): Promise<void> {
    return
  }
  getJwt(): string {
    return 'abcdfr'
  }
  getSubject(): string {
    return 'mock-id'
  }
}