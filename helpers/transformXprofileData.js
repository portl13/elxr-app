const transformXprofileData = (profile, group) => {

    const { xprofile: { groups } } = profile;

    const data = {};

    const fields = Object.values(groups[group].fields);

    fields.map(field => {
        data[field.name.replace(/\s+/g, '_').toLowerCase()] = field.value
    })

    return data;
}

export default transformXprofileData;
