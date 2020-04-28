## Development

```
yarn
yarn build
```

## Testing

1. Watch tests for changes, i.e. TDD - `yarn test:watch`
2. Generate test coverage report - `yarn test:coverage`
3. E2E tests
   1. Open Cypress GUI with `yarn cy`
   2. Start server with `yarn dev`
   3. Run tests

## Reflection

### Redux

I don't believe redux is needed for this particular use case. Redux makes it easy to reason about complex changes in state that includes mutations. But there's no such here. There's only downloading and displaying data from an api. The `useSWR` hook from [zeit/swr](https://github.com/zeit/swr) is more than adequate. It's got states such as `loading`, and `errored` built in to it. It's just one line of code.

```
const { data, error, isValidating: isLoading } = useSWR('/leases', fetcher)
```

and it will replace the store, reducer, action creators and thunks and save on a whole bunch of development and maintenance overhead.
