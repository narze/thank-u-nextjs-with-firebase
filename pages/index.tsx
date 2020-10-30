import tw from 'twin.macro'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/core'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import initFirebase from '../utils/initFirebase'
import firebase from 'firebase/app'

initFirebase()

export const Home = (): JSX.Element => {
  const { handleSubmit, errors, register, formState } = useForm()
  const [user, setUser] = useState<null | firebase.User>(null)

  const login = ({ email, password }) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user)
      })
      .catch((e) => {
        alert(e.message)
      })
  }

  return (
    <main>
      <form onSubmit={handleSubmit(login)}>
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" name="email" ref={register({ validate: null })} />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            ref={register({ validate: null })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <div css={tw`mt-4`}>
          <Button
            variantColor="teal"
            isLoading={formState.isSubmitting}
            type="submit"
          >
            Login
          </Button>
        </div>

        {user && <div>Welcome back {user.email}!</div>}
      </form>
    </main>
  )
}

export default Home
