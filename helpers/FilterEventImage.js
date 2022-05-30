const FilterEventImage = (image) => {
  const thumbnail = "post-thumbnail";

  if (!image) return;

  if (image.url) {
    return image.url;
  }

  if (typeof image.sizes["pc-large"] !== "undefined") {
    return image?.sizes["pc-large"];
  }

  if (typeof image.sizes.medium_large !== "undefined") {
    return image.sizes.medium_large;
  }

  if (typeof image.sizes[thumbnail] !== "undefined") {
    return image.sizes[thumbnail];
  }

  if (typeof image.sizes.ct_actor_thumb !== "undefined") {
    return image.sizes[thumbnail];
  }

  return false;
};

export default FilterEventImage;
