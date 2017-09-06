# myreadsReactProject
A react project that demonstrates fundamental principles of react (component, props, states, router)

## Approach:

I decided to use 03 different `components` even I should use only one to render books into 03 categories (read, want to read, currently reading). They are:

 * `ListBooksCurrentRead` for displaying currently reading books 

 * `ListBooksRead` for displaying books that had been read

 * `ListBooksToRead` for todo read

 They share the same state but filtered for each component custom attribut called `status`:

![](./filter.png)