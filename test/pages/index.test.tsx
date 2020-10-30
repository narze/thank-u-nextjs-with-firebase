import { fireEvent, render, waitFor } from '../testUtils'
import { Home } from '../../pages/index'
import { when } from 'jest-when'
import firebase from 'firebase/app'

describe('Home page', () => {
  beforeEach(() => {
    const mockSignin = jest.spyOn(firebase.auth(), 'signInWithEmailAndPassword')

    when(mockSignin)
      .calledWith('dev@eventpop.me', 'password')
      .mockResolvedValue({
        user: { email: 'dev@eventpop.me' },
      } as firebase.auth.UserCredential)
  })

  it('handles login with firebase emulated account', async () => {
    const { getByLabelText, getByRole, getByText } = render(<Home />, {})

    fireEvent.change(getByLabelText(/Email/i), {
      target: { value: 'dev@eventpop.me' },
    })

    fireEvent.change(getByLabelText(/Password/i), {
      target: { value: 'password' },
    })

    fireEvent.click(getByRole('button', { name: /Login/i }))

    await waitFor(() => getByText(/Welcome back dev@eventpop.me!/i))
  })
})
