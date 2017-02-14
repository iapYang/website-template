```
breakpoints = require("../../utils/breakpoints.json");
```

# Basic Example
```
<ImageView
  src="http://placehold.it/1600x900"
  caption="This is a caption"
  credit="Placehold.it"
/>
```

# Change Image at Breakpoint
Learn more about [Working with Responsive Images](https://github.com/nytpi/scaffolding-next/blob/master/docs/React-Best-Practices.md#responsive-multi-source-images-with-picturetag) in the scaffolding-next docs.

```
<ImageView
  src={{
    [breakpoints.compact]: "http://placehold.it/640x480",
    [breakpoints.regular]: "http://placehold.it/1000x750"
  }}
/>
``` 
