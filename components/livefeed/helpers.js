export const sanitizeTitleForEventType = (string) => {
    const doc = new DOMParser().parseFromString(string, 'text/html');
    doc.querySelector('a:last-child').href = '/'
    doc.querySelector('a:first-of-type')?.remove()
    return doc.querySelector('body').innerHTML; 
}

export const sanitizeTitleForUpdate = (string) => {
    const doc = new DOMParser().parseFromString(string, 'text/html');
    doc.querySelector('a:first-of-type')?.remove()
    return doc.querySelector('body').innerHTML; 
}

export const sanitizeByType = ({ type, title }) => {
    if (type === 'new_blog_tribe_events' || type === 'new_blog_ct_actor' || type === 'created_group' ||
        type === 'activity_update' || type === 'joined_group' || type === 'friendship_created'
        || type === 'friendship_accepted') {
        return sanitizeTitleForEventType(title);
    }
    if (type === 'activity_update' || type === 'new_avatar' || type === 'updated_profile' ||
        type === 'new_member' || type === 'group_details_updated' || type === 'bbp_topic_create'
        || type === 'bbp_reply_create') {
        return sanitizeTitleForUpdate(title);
    }
}
