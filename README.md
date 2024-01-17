# Student Management System

# Tech Used:

1. React/Next
2. react-hook-form
3. react table
4. react chart
5. Firebase
6. Daisy UI
7. Jest

# Lessons Learnt:

Firebase-> storage ,authentication ,cloud firestore,security rules,emulator suite

# References:

- [Creating React custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

## Firebase

- [Getting Started](https://firebase.google.com/docs/)

- Security Rules: The main line of defense between your database and all of those untrustworthy clients

  - [1-Firebase docs](https://firebase.google.com/docs/rules/basics)
  - [2](https://www.youtube.com/watch?v=TglPc74M3DM)
  - [3](https://www.youtube.com/watch?v=b7PUm7LmAOw)

- Unit Testing:

  - [Quick Reference](https://github.com/firebase/quickstart-testing)

  If learning -> start from these:

  - [1-Fireship introductory video](https://www.youtube.com/watch?v=Rx4pVS1vPGY)
  - [2-Setting up emulator for testing security rules](https://firebase.google.com/docs/rules/emulator-suite)
  - [3-Writing unit tests](https://firebase.google.com/docs/rules/unit-tests)
  - [4-Deprecated but tests structure reference](https://github.com/akauppi/firebase-jest-testing/blob/master/package/Writing%20tests.md#testing-security-rules)

  - [Pagination](https://www.youtube.com/watch?v=Lz8MJ9VzXZ8)

## RTK and RTK query

### RTK

- [1. Setting up RTK](https://redux-toolkit.js.org/usage/nextjs)
- [2. For TypeScript](https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks)

- actions(each functions are called actions which change the state) and reducers(basically all the functions which change the states of that particular slice)

```
reducers:{
 // Use the PayloadAction type to declare the contents of `action.payload`
  incrementByAmount: (state, action: PayloadAction<number>) => {
    state.value += action.payload
  },
}
```

- selectors:

```
  const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 0 },
    reducers: {
      /* ... */
    },
  })

  const selectCounterValue = (rootState: RootState) => rootState.counter?.value // number | undefined
  selectCounterValue({}), // undefined
  selectCounterValue({ counter: { value: 2 } }), // 2

  But why useSelector:
  For useSelector, it saves you the need to type (state: RootState) every time

  export const { increment, decrement, incrementByAmount } = counterSlice.actions

  // Other code such as selectors can use the imported `RootState` type
  export const selectCount = (state: RootState) => state.counter.value

  export default counterSlice.reducer

```

- For createSelector in RTK -> Memoised selector
  #if you make change to the store all of the useSelector gets run so to avoid the running of expensive calculations, we use memoisation and createSelector

  ```
    const outputSelector = createSelector(
    [inputSelector1, inputSelector2, inputSelector3], // synonymous with `dependencies`.
    resultFunc // Result function
    )
  ```

  if changes in any dependencies or inputSelector's , the resultFunc will run

  Example:

  ```
    import React from 'react'
    import { useSelector } from 'react-redux'
    import { createSelector } from 'reselect'

    const selectNumCompletedTodos = createSelector(
    (state) => state.todos,
    (todos) => todos.filter((todo) => todo.completed).length
    )

    export const CompletedTodosCounter = () => {
    const numCompletedTodos = useSelector(selectNumCompletedTodos)
    return <div>{numCompletedTodos}</div>
    }

    export const App = () => {
    return (
    <>
    <span>Number of completed todos:</span>
    <CompletedTodosCounter />
    </>
    )
    }

  ```

### Integrating Firebase and RTK query

- [1. Stack overflow](https://stackoverflow.com/questions/71587312/is-it-possible-to-use-firebase-query-with-redux-toolkit-or-rtk-query-in-react)

- [2. RTK docs](https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#implementing-a-queryfn)

## Next.js

- [useRouter](https://nextjs.org/docs/pages/api-reference/functions/ use-router)
  useRouter from next/navigation used outside page directory and form next/router used inside pages directory
- [pages and layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)
  layout.tsx -> preserves the layout of that route -> static example header and footer
  page.tsx -> the content on that route
  Example if admin->page.tsx,layout.tsx and dashboard(another route inside admin)->page.tsx. Here layout .tsx will be shared between dashboard and page.tsx
- To Fetch user data server-side to eliminate a flash of unauthenticated content.
  - [Next.js Authentication pattern docs](https://nextjs.org/docs/pages/building-your-application/routing/authenticating)
  - [Authentication pattern template example with Firebase](https://github.com/vercel/next.js/tree/canary/examples/with-firebase)

## Github and Youtube Reference

- [Firebase CRUD Example template](https://github.com/umeshmk/rp-react-firebase-crud/tree/main)

- [Firebase chat app example](https://github.com/NaveenDanj/pico)

- [Lama Dev Firebase Tutorial](https://www.youtube.com/watch?v=D9W7AFeJ3kk)

## Random

- nullish coalescing operator (??). This operator is used to provide a default value when the left-hand side is null or undefined.

- With the new satisfies operator, you can use type assertion and still let Typescript validate the type of the value that you are asserting.

When you use the as keyword, it implies that you are responsible for the type safety of that line of code; not the TypeScript compiler. - No longer valid if you use it with the satisfies operator.

```
// file: app.ts
import { type User, createUsername } from './types.ts';

const user = { isActive: true, id: 'uuid' } satisfies User as User;
const name = createUsername(user);

```
