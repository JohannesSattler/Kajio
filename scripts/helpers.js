
/**
 * converts a timestamp to a sentence how long ago
 * @param {Date} timestamp timestamp from DB timestamps
 * @returns A sentence how long ago. For example: 2 min ago
 */
function convertToTimeAgo(timestamp) {
    const diff = new Date() - timestamp // get difference

    const year = Math.floor(diff / 1000 / 60 / 60 / 24 / 365)
    const month = Math.floor(diff / 1000 / 60 / 60 / 24 / 30)
    const day = Math.floor(diff / 1000 / 60 / 60 / 24)
    const hour = Math.floor(diff / 1000 / 60 / 60)
    const minute = Math.floor(diff / 1000 / 60)

    const timesObj = {year, month, day, hour, minute};

    // Check for first valid value and return sentence
    let sentence = ''
    for (const key in timesObj) {
        if(timesObj[key] != 0) {
            const suffix = timesObj[key] > 1 ? 's' : ''
            sentence = `${timesObj[key]} ${key}${suffix} ago`
            break;
        }
    }

    if(!sentence.length) return 'Just now'
    return sentence
}

/**
 * creates advanced params for post model
 * @param {Object} post Post model
 * @param {ObjectID} userID from UserModel
 */
function createAdvancedPostKeys(post, userID) {
    if(post.upvotes.includes(userID)) {
        post.upvote = "some"
      }
      if(post.downvotes.includes(userID)) {
        post.downvote = "some"
      }
  
      post.votes = post.upvotes.length - post.downvotes.length
      post.timeAgo = convertToTimeAgo(post.createdAt)
      post.userid = userID
}

module.exports = {convertToTimeAgo, createAdvancedPostKeys}


