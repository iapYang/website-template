import $ from "jquery";
import "slick-carousel";

const eventTypeActions = {
  swipe: "Swipe",
  dots: "Progress Indicators",
  arrows: "Arrows"
};

const changeHandler = function(e) {
  if (this.track) {
    const eventType = this.slideChangeEventType;
    const eventActionStr = eventTypeActions[eventType] ? eventTypeActions[eventType] : 'Unknown Interaction';

    this.track({
      category: this.getEventCategoryName(),
      action: `Change Slide with ${eventActionStr}`,
      label: `Slide ${this.currentSlide() + 1}`
    });
  }
};

const setUpCustomArrows = function() {
  //add custom navs with inline svg to enable customization of nav color
  const slickNextButton = '<button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Next" role="button" style=""><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 29.3 51.5"><defs><path id="a" d="M0 0h29.3v51.5H0z"></path></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"></use></clipPath><path class="arrow" clip-path="url(#b)" fill="none" stroke-width="5" stroke-miterlimit="10" d="M1.8 1.8l24 24-24 24"></path></svg></button>';
  const slickPrevButton = '<button type="button" data-role="none" class="slick-prev slick-arrow" aria-label="Previous" role="button" style=""><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 29.3 51.5"><defs><path id="a" d="M0 0h29.3v51.5H0z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path class="arrow" clip-path="url(#b)" fill="none" stroke-width="5" stroke-miterlimit="10" d="M27.5 49.8l-24-24 24-24"/></svg></button>';

  const slickSettings = this.props.slickSettings;

  //if slickSettings has defined nav buttons pass those otherwise get our default buttons
  slickSettings.prevArrow = slickSettings.prevArrow || slickPrevButton;
  slickSettings.nextArrow = slickSettings.nextArrow || slickNextButton;
};

export const didMount = function() {
  setUpCustomArrows.call(this);

  // Initialize Slick
  $(this._container).slick(this.props.slickSettings);

  this.currentSlide = () => { return $(this._container).slick('slickCurrentSlide'); };

  // Init event tracking bookkeeping
  this.fromSlide = 0;
  this.slideChangeEventType = null;

  // Before slide change: note which interaction type is triggering the change
  $(this._container).on('beforeChange', e => {
    // Clicking a dot may set this to "dots" instead before we get called
    if (this.slideChangeEventType === null) {
      this.slideChangeEventType = "arrows";
    }
  });

  $(this._container).on('swipe', e => {
    this.slideChangeEventType = "swipe";
  });

  $(this._container).find(".slick-dots").on("click", "li button", () => {
    this.slideChangeEventType = "dots";
  });

  // After slide change: call changeHandler(), which fires an event
  $(this._container).on('afterChange', e => {
    if (typeof this.fromSlide !== "undefined" && this.fromSlide !== this.currentSlide()) {
      changeHandler.call(this, e);
    }

    // Note which slide we'll be coming from for the next event
    this.fromSlide = this.currentSlide();
    this.slideChangeEventType = null;
  });
};

export const willUnmount = function() {
  $(this._container).slick("unslick");
};
