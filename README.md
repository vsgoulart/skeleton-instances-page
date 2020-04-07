To install and run just execute `yarn` and then `yarn start`. Both the frontend and mock backend servers are going to
start.

## Expectations

- On first load workflows, instances statistics, instances and operations should be loaded
- Every filter field change should update the URL and trigger instances and statics refetch
- Changes on filter won't affect the endpoint for the sake of time, but instances request should have the proper body
- When instances are fetched we should start polling if there is any instance with active operations
- Instances and operations should start polling when a single or batch operation is started
- Instances and operations polling should be stopped as soon as there is no active operations anymore

## Comparison criteria

- Easy to implement? (learning curve)
- Maintainability on more complex state
- Code readability
- Library documentation
- Active support/community
- Performance
- Testability
