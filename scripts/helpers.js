const PostModel = require('../models/Post.model');

// Hot Sorting: [["totalVotes", "desc"], ["commentsCount","desc"]]
// trendy sorting: [["createdAt", "desc"], ["totalVotes","desc"], ["commentsCount","desc"]]
// new sorting: {createdAt: -1}

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

    const timesObj = {
        year,
        month,
        day,
        hour,
        minute
    };

    // Check for first valid value and return sentence
    let sentence = ''
    for (const key in timesObj) {
        if (timesObj[key] != 0) {
            const suffix = timesObj[key] > 1 ? 's' : ''
            sentence = `${timesObj[key]} ${key}${suffix} ago`
            break;
        }
    }

    if (!sentence.length) return 'Just now'
    return sentence
}

/**
 * creates advanced params for post model
 * @param {Object} post Post model
 * @param {ObjectID} userID from UserModel
 */
function createAdvancedPostKeys(post, userID) {
    if (post.upvotes.includes(userID)) {
        post.upvote = "some"
    }
    if (post.downvotes.includes(userID)) {
        post.downvote = "some"
    }

    post.votes = post.upvotes.length - post.downvotes.length
    post.timeAgo = convertToTimeAgo(post.createdAt)
    post.userid = userID
}

/**
 * @param {Some} cloneObj 
 * @returns a deep clone of some object that is passed
 */
function clone(cloneObj) {
    return JSON.parse(JSON.stringify(cloneObj))
}


// ------------------------------
//  DO I EVEN NEED THIS?
// --------------------------

/**
 * Sorts all time post by upvotes & comments
 * @param {Object} posts 
 * @returns new post array
 */
function hotPostSorting(posts) {
    const clonePost = clone(posts) // deep clone the object
    
    clonePost.sort((a, b) => {
        const upvotesA = a.upvotes.length - a.downvotes.length; // gets upvotes from a
        const upvotesB = b.upvotes.length - b.downvotes.length; // gets upvotes from b

        if(upvotesA > upvotesB) return 1;
        else if (upvotesA < upvotesB) return -1;
        else { //check for comment amount 
            if(a.comments.length > b.comments.length) {
                return 1;
            }
            else if(a.comments.length < b.comments.length) {
                return -1;
            }
            else {
                return 0;
            }
        }
    })

    return clonePost;
}

/**
 * Updates the post with a counter
 * @param {Object} post // the post that should be updated
 * @param {ObjectID} postID *optional
 */
async function updatePostWithCounter(post, postID) {
  // update post counters
  post.totalVotes = post.upvotes.length - post.downvotes.length;
  post.commentsCount = post.comments.length;
  await PostModel.findByIdAndUpdate(postID || post._id, post)
}

/**
 * 
 */
function getPostSortFromURL(url) {
    console.log(url);

    const url2sort = {
        'hot': [["totalVotes", "desc"], ["commentsCount","desc"]],
        'trendy': [["totalVotes","desc"],["createdAt","desc"]],
        'new': [["createdAt","desc"]]
    }

    let splitted =  url.split('/')
    let key = splitted[splitted.length-1]

    return url2sort[key]
}

module.exports = {
    convertToTimeAgo,
    createAdvancedPostKeys,
    hotPostSorting,
    clone,
    updatePostWithCounter,
    getPostSortFromURL
}