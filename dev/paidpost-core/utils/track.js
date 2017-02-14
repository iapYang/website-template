const postDetails = `${PaidPost.clientName} - ${PaidPost.projectName}`;

/**
 *
 * @param {object} options - An object with these properties:
 * {string} category - Required. The GA category associated with this event (concatenated together with the post's client name and project name
 * {string} action - Required. The action being performed
 * {string} label - An optional text string that further describes the action
 * {number} value - An optional number value to associate with this event (and sum, average, etc. in GA)
 */
export default function(options = {
  category: undefined,
  action: undefined,
  label: undefined,
  value: undefined
}) {
  let {category, action, label, value} = options;

  if (typeof window.ga !== "undefined") {
    if (typeof category !== "string" || category === null) {
      throw new Error("track(): parameter `category` is not a string");
    }

    const categoryStr = `${postDetails} - ${category}`;

    if (typeof action !== "undefined" && action !== null && typeof action !== "string") {
      throw new Error("track(): parameter `action` is not a string");
    }

    if (typeof label !== "undefined" && label !== null && typeof label !== "string") {
      throw new Error("track(): parameter `label` is not a string");
    }

    if ((typeof value !== "undefined" && value !== null && typeof value !== "number")) {
      throw new Error("track(): parameter `value` is not a number");
    }
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventValue
    if(typeof value === "number" && (value < 0 || Math.floor(value) !== value)) {
      throw new Error("track(): parameter `value` is not a non-negative integer");
    }

    window.ga(
      'send',
      'event',
      categoryStr,
      action,
      label,
      value
    );
  }
};
