# Comprehensive Example

```
// Load Lorem Ipsum paragraphs globally for demonstration purposes
lipsum = require("../../utils/lorem-ipsum.json").paragraphs;
<PaidPostArticle fontFamily="system">
  <Section>    
    <LayoutContainer type="center" aspect="narrow">
      <ImageView
        src="http://placehold.it/1194x1365"
        caption={lipsum[2].substr(0,160)}
        credit="Joseph Kohlmann"
      />
    </LayoutContainer>
    
    <LayoutContainer type="center" aspect="square">
      <ImageView
        src="http://placehold.it/1000x1000"
        caption={lipsum[2].substr(0,160)}
        credit="Joseph Kohlmann"
      />
    </LayoutContainer>
    
    <LayoutContainer type="center" aspect="wide">
      <ImageView
        src="http://placehold.it/1986x1490"
        caption={lipsum[2].substr(0,160)}
        credit="Joseph Kohlmann"
      />
    </LayoutContainer>
    
    <BodyCopy>
      <h3>Lipsum Subhead</h3>
      <p>{lipsum[0]}</p>
      <h3>Lipsum Subhead</h3>
      <p>{lipsum[1]}</p>
    </BodyCopy>

    <LayoutContainer 
      style={{
        color: "#246ab9",
        marginBottom: "0px",
        marginTop: "0px"
      }} 
      type="float-left"
      aspect="wide"
    >
      <PullQuote
        credit="The Author"
        variant="left"
        creditStyle={{
          color: "#0d3159"  
        }}
      >
      </PullQuote>
    </LayoutContainer>

    <BodyCopy>
      <p>{lipsum[1]}</p>
    </BodyCopy>
    
    <BodyCopy>
      <p>{lipsum[2]}</p>
      <h3>Lipsum Subhead</h3>
    </BodyCopy>

    <LayoutContainer type="float-right" aspect="square">
      <ImageView
        src="http://placehold.it/1000x1000"
        caption={lipsum[2].substr(0,160)}
        credit="NASA"
      />
    </LayoutContainer>

    <BodyCopy>
      <p>{lipsum[2]}</p>
    </BodyCopy>

  </Section>
  <LayoutContainer 
    style={{color: "#e222d7"}} 
    type="full-bleed"
    background={{
      color:"#000000"
    }}
  >
    <PullQuote
      caption="Motivation is what gets you started. Habit is what keeps you going."
      credit="Jim Rohn"
      variant="center"
      quoteStyle={{
        color: "#20a25f"  
      }}
      creditStyle={{
        color: "#ffffff"  
      }}
    >
    </PullQuote>
  </LayoutContainer>

  <Section>
    <BodyCopy> 
      <p>{lipsum[3]}</p>
    </BodyCopy>
    
    <BodyCopy>
      <h3>Lipsum Subhead</h3>
    </BodyCopy>
    
    <LayoutContainer type="float-left" aspect="narrow">
      <ImageView
        src="http://placehold.it/1365x2048"
        caption={lipsum[2].substr(0,160)}
        credit="Joseph Kohlmann"
      />
    </LayoutContainer>
    
    <BodyCopy>
      <p>{lipsum[3]}</p>
    </BodyCopy>
  </Section>
</PaidPostArticle>  
```

```
<PaidPostArticle fontFamily="system">
  <Section>
    <BodyCopy>
      <h3>Lipsum Subhead</h3>
    </BodyCopy>
    <LayoutContainer 
      style={{
        color: "#f38ce2",
        marginTop: "0px",
        marginBottom: "0px"
      }} 
      type="float-right"
      aspect="wide"
    >
      <PullQuote
        credit="The Author"
        variant="left"
      >
      </PullQuote>
    </LayoutContainer>
    <BodyCopy>
      <p>{lipsum[0]}</p>
    </BodyCopy>
  </Section>

  <LayoutContainer
    type="full-screen"
    background={{
      color: "#252424",
      attachment: "fixed"
    }}
    style={{
      color: "#fff"
    }}
  >
    <BodyCopy style={{
      padding: "4em",
      boxSizing: "border-box",
      backgroundColor: "rgba(0,0,0,0.5)",
      WebkitBackdropFilter: "saturate(180%) blur(20px)",
      backdropFilter: "saturate(180%) blur(20px)"
    }}>
      <h3>Lipsum Subhead</h3>
      <p>{lipsum[3].substr(0,200)}.</p>
    </BodyCopy>
  </LayoutContainer>

  <Section style={{paddingTop: 0}}>
    <LayoutContainer type="full-bleed">
      <ImageView
        src="http://placehold.it/1605x730"
        credit="Joseph Kohlmann"
      />
    </LayoutContainer>

    <BodyCopy>
      <h3>Lipsum Subhead</h3>
      <p>{lipsum[0]}</p>
      <h3>Lipsum Subhead</h3>
      <p>{lipsum[0]}</p>
    </BodyCopy>
  </Section>

  <Section style={{color: "#fff"}} background={{
    color: "#252424",
  }}>
    <BodyCopy>
      <h3>Lipsum Subhead</h3>
      <p>{lipsum[0]}</p>
    </BodyCopy>

    <LayoutContainer type="center" aspect="wide">
      <ImageView
        src="http://placehold.it/1986x1490"
        caption="“The time is always right to do what is right.”"
        credit="—Dr. Martin Luther King, Jr."
      />
    </LayoutContainer>

    <BodyCopy>
      <h3>Lipsum Subhead</h3>
      <p>{lipsum[1]}</p>
    </BodyCopy>
  </Section>

  <Section>
    <BodyCopy>
      <h3>Lipsum Subhead</h3>
      <p>{lipsum[1]}</p>
    </BodyCopy>

    <LayoutContainer type="center" aspect="square">
      <ImageView
        src="http://placehold.it/1000x1000"
        caption={lipsum[2]}
        credit="NASA"
      />
    </LayoutContainer>

    <BodyCopy>
      <p>{lipsum[2]}</p>
    </BodyCopy>

    <LayoutContainer type="center" aspect="square">
      <ImageView
        src="http://placehold.it/1000x1000"
        caption={lipsum[2]}
        credit="NASA"
      />
    </LayoutContainer>

    <LayoutContainer type="center" aspect="narrow">
      <ImageView
        src="http://placehold.it/1365x2048"
        caption={lipsum[2]}
        credit="NASA"
      />
    </LayoutContainer>
  </Section>
</PaidPostArticle>
```

----

# Default (Source Sans Pro)
```
<PaidPostArticle>
  <Section>
      <BodyCopy>
        <h3>Subhead</h3>
        <p>{lipsum[0]}</p>
      </BodyCopy>
    </Section>
</PaidPostArticle>
```

# Lato
```
<PaidPostArticle fontFamily="Lato">
  <Section>
    <BodyCopy>
      <h3>Subhead</h3>
      <p>{lipsum[0]}</p>
    </BodyCopy>
  </Section>
</PaidPostArticle>
```

# Roboto
```
<PaidPostArticle fontFamily="Roboto">
  <Section>
    <BodyCopy>
      <h3>Subhead</h3>
      <p>{lipsum[0]}</p>
    </BodyCopy>
  </Section>
</PaidPostArticle>
```

# Open Sans
```
<PaidPostArticle fontFamily="Open Sans">
  <Section>
    <BodyCopy>
      <h3>Subhead</h3>
      <p>{lipsum[0]}</p>
    </BodyCopy>
  </Section>
</PaidPostArticle>
```

# System Font (San Francisco, Roboto, Segoe UI, etc.)
```
<PaidPostArticle fontFamily="system">
  <Section>
    <BodyCopy>
      <h3>Subhead</h3>
      <p>{lipsum[0]}</p>
    </BodyCopy>
  </Section>
</PaidPostArticle>
```
