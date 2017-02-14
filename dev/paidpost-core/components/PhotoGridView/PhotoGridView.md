# 2-Up Normal Grid
```
// Load Lorem Ipsum paragraphs globally for demonstration purposes
lipsum = require("../../utils/lorem-ipsum.json").paragraphs;
<PaidPostArticle fontFamily="system">
  <Section>
    <LayoutContainer type="center">
      <PhotoGridView>
        <ImageView
          src="http://placehold.it/948x1068"
          caption={lipsum[2].substr(0,160)}
          credit="Joseph Kohlmann"
        />
        <ImageView
          src="http://placehold.it/948x1068"
          caption={lipsum[2].substr(0,120)}
          credit="Joseph Kohlmann"
        />
      </PhotoGridView>
    </LayoutContainer>
  </Section>
</PaidPostArticle>
```

# 3-Up Normal Grid
```
<PaidPostArticle fontFamily="system">
  <Section>
    <LayoutContainer type="center">
      <PhotoGridView>
        <ImageView
          src="http://placehold.it/624x1068"
          caption={lipsum[2].substr(0,160)}
          credit="Joseph Kohlmann"
        />
        <ImageView
          src="http://placehold.it/624x1068"
          caption={lipsum[2].substr(0,120)}
          credit="Joseph Kohlmann"
        />
        <ImageView
          src="http://placehold.it/624x1068"
          caption={lipsum[2].substr(0,120)}
          credit="Joseph Kohlmann"
        />
      </PhotoGridView>
    </LayoutContainer>
  </Section>
</PaidPostArticle>
```

# 3-Up Alternate Grid
```
<PaidPostArticle fontFamily="system">
  <Section>
    <LayoutContainer type="center">
      <PhotoGridView alternate>
        <ImageView
          src="http://placehold.it/948x1068"
          caption={lipsum[2].substr(0,160)}
          credit="Joseph Kohlmann"
        />
        <ImageView
          src="http://placehold.it/948x518"
          caption={lipsum[2].substr(0,120)}
          credit="Joseph Kohlmann"
        />
        <ImageView
          src="http://placehold.it/948x518"
          caption={lipsum[2].substr(0,120)}
          credit="Joseph Kohlmann"
        />
      </PhotoGridView>
    </LayoutContainer>
  </Section>
</PaidPostArticle>
```

# 3-Up Flipped Alternate Grid
```
<PaidPostArticle fontFamily="system">
  <Section>
    <LayoutContainer type="center">
      <PhotoGridView alternate flip>
        <ImageView
          src="http://placehold.it/948x1068"
          caption={lipsum[2].substr(0,160)}
          credit="Joseph Kohlmann"
        />
        <ImageView
          src="http://placehold.it/948x518"
          caption={lipsum[2].substr(0,120)}
          credit="Joseph Kohlmann"
        />
        <ImageView
          src="http://placehold.it/948x518"
          caption={lipsum[2].substr(0,120)}
          credit="Joseph Kohlmann"
        />
      </PhotoGridView>
    </LayoutContainer>
  </Section>
</PaidPostArticle>
```

# 4-Up Normal Grid
```
<PaidPostArticle fontFamily="system">
  <Section>
    <LayoutContainer type="center">
      <PhotoGridView>
        <ImageView
          src="http://placehold.it/948x518"
          caption={lipsum[2].substr(0,160)}
          credit="Joseph Kohlmann"
        />
        <ImageView
          src="http://placehold.it/948x518"
          caption={lipsum[2].substr(0,120)}
          credit="Joseph Kohlmann"
        />
        <ImageView
          src="http://placehold.it/948x518"
          caption={lipsum[2].substr(0,120)}
          credit="Joseph Kohlmann"
        />
        <ImageView
          src="http://placehold.it/948x518"
          caption={lipsum[2].substr(0,120)}
          credit="Joseph Kohlmann"
        />
      </PhotoGridView>
    </LayoutContainer>
  </Section>
</PaidPostArticle>
```

# 4-Up Normal Grid + Masonry-Style Images
Note that the left images share a common border with the right images. 

```
<PaidPostArticle fontFamily="system">
  <Section>
    <LayoutContainer type="center">
      <PhotoGridView>
        <ImageView
          src="http://placehold.it/1176x480"
          caption={lipsum[2].substr(0,160)}
          credit="Joseph Kohlmann"
        />
        <ImageView
          src="http://placehold.it/720x678"
          caption={lipsum[2].substr(0,120)}
          credit="Joseph Kohlmann"
        />
        <ImageView
          src="http://placehold.it/1176x556"
          caption={lipsum[2].substr(0,120)}
          credit="Joseph Kohlmann"
        />
        <ImageView
          src="http://placehold.it/720x358"
          caption={lipsum[2].substr(0,120)}
          credit="Joseph Kohlmann"
        />
      </PhotoGridView>
    </LayoutContainer>
  </Section>
</PaidPostArticle>
```

# 4-Up Normal Grid + `column` Prop + Masonry-Style Images
Note that the top images share a common border with the bottom images.
```
<PaidPostArticle fontFamily="system">
  <Section>
    <LayoutContainer type="center">
      <PhotoGridView column>
        <ImageView
          src="http://placehold.it/818x656"
          caption={lipsum[2].substr(0,160)}
          credit="Joseph Kohlmann"
        />
        <ImageView
          src="http://placehold.it/1078x656"
          caption={lipsum[2].substr(0,120)}
          credit="Joseph Kohlmann"
        />
        <ImageView
          src="http://placehold.it/1158x380"
          caption={lipsum[2].substr(0,120)}
          credit="Joseph Kohlmann"
        />
        <ImageView
          src="http://placehold.it/738x380"
          caption={lipsum[2].substr(0,120)}
          credit="Joseph Kohlmann"
        />
      </PhotoGridView>
    </LayoutContainer>
  </Section>
</PaidPostArticle>
```

# 4-Up Alternate Grid
```
<PaidPostArticle fontFamily="system">
  <Section>
    <LayoutContainer type="center">
      <PhotoGridView alternate>
        <ImageView
          src="http://placehold.it/556x1068"
          caption={lipsum[2].substr(0,160)}
          credit="Joseph Kohlmann"
        />
        <ImageView
          src="http://placehold.it/752x518"
          caption={lipsum[2].substr(0,120)}
          credit="Joseph Kohlmann"
        />
        <ImageView
          src="http://placehold.it/752x518"
          caption={lipsum[2].substr(0,120)}
          credit="Joseph Kohlmann"
        />
        <ImageView
          src="http://placehold.it/556x1068"
          caption={lipsum[2].substr(0,120)}
          credit="Joseph Kohlmann"
        />
      </PhotoGridView>
    </LayoutContainer>
  </Section>
</PaidPostArticle>
```
