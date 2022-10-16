const transformXprofileData = (profile, group) => {
  if (!profile) return null;

  const {
    xprofile: { groups },
  } = profile;
  const data = {};
  if (!groups[group]?.fields) return;

  for (const [key, value] of Object.entries(groups[group].fields)) {
    data[value.name.replace(/\s+/g, "_").toLowerCase()] = {
      value: value.value.raw,
      id: key,
    };
  }

  return data;
};

export default transformXprofileData;
