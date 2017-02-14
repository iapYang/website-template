# Basic Usage (with Placeholder Text)
```
// Load Lorem Ipsum paragraphs for demonstration purposes
lipsum = require("../../utils/lorem-ipsum.json").paragraphs;
<BodyCopy>
  <h3>Subhead</h3>
  {lipsum.slice(0,2).map(para => (
    <p>{para}</p>
  ))}
</BodyCopy>
```

# Nested in a PaidPostArticle
As shown here, `PaidPostArticle` assigns the appropriate `font-family`, which cascades to the child nodes.

`BodyCopy` takes care of layout width and auto margins for itself and sets `font-size`, `line-height`, and `margin` for its immediate `<p>` and `<h3>` child nodes. (`BodyCopy` also sets a `font-weight` on the `<h3>` element.)

```
<PaidPostArticle fontFamily="Lato">
  <BodyCopy>
    <h3>Subhead</h3>
    {lipsum.slice(0,2).map(para => (
      <p>{para}</p>
    ))}
    <h3>Lipsum Subhead</h3>
    {lipsum.slice(3,5).map(para => (
      <p>{para}</p>
    ))}
  </BodyCopy>
</PaidPostArticle>
```
# Nested in a PaidPostArticle and Section
As shown here, `PaidPostArticle` assigns the appropriate `font-family`, `Section` adds a background color, and `BodyCopy` retains the responsibilities described above.

```
<PaidPostArticle fontFamily="Lato">
  <Section>   
    <BodyCopy>
      <h3>Subhead</h3>
      {lipsum.slice(0,2).map(para => (
        <p>{para}</p>
      ))}
    </BodyCopy>
  </Section>
</PaidPostArticle>
```
