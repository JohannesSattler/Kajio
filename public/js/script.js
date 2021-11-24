document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("Kaji JS imported successfully!");
    addAllEventListeners()
  },
  false
);

function addAllEventListeners() {
  addPostEventListeners()

  document.addEventListener('scroll', () => {
    const url = window.location.href;
    if (url.endsWith('home/hot') || url.endsWith('home/trendy') || url.endsWith('home/new')) {
      if (isScrolledIntoView(posts[posts.length - 1])) {
        infiniteScroller()
        posts = document.querySelectorAll('.post-holder')
      }
    }
  })
}

let posts = null

function addPostEventListeners() {
  posts = document.querySelectorAll('.post-holder')
  if (posts.length) {
    posts.forEach(async (post, index) => handlePostEvents(post))
  };
}

function handlePostEvents(post) {
  const uparrow = post.querySelector('#votes-uparrow')
  const downarrow = post.querySelector('#votes-downarrow')

  uparrow.addEventListener('click', handleVoteClick)
  downarrow.addEventListener('click', handleVoteClick)
}

async function handleVoteClick(event) {
  const parent = event.currentTarget.parentNode;
  const userID = parent.querySelector('.user-objectID').id
  const postID = parent.querySelector('.post-objectID').id
  const upOrDownVote = event.currentTarget.id == 'votes-uparrow';

  const downVote = parent.querySelector('#votes-downarrow')
  const upVote = parent.querySelector('#votes-uparrow')
  const counter = parent.querySelector('#votes-amount')

  // change up/down vote buttons
  if (upOrDownVote) {
    if(upVote.classList.contains('img-upvote')) {
      upVote.classList.remove('img-upvote')
    }
    else {
      upVote.classList.add('img-upvote')
    }

    downVote.classList.remove('img-downvote')
  } else {
    upVote.classList.remove('img-upvote')

    if(downVote.classList.contains('img-downvote')) {
      downVote.classList.remove('img-downvote')
    }
    else {
      downVote.classList.add('img-downvote')
    }
  }

  const server = process.env.SERVER_URL || "http://localhost:3000";
  const data = await fetch(server + "/home/vote", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userID,
      postID,
      upOrDownVote
    })
  })

  const response = await data.json()
  counter.innerText = JSON.parse(response).votes
}



// https://stackoverflow.com/a/22480938/14548868
function isScrolledIntoView(elem) {
  const rect = elem.getBoundingClientRect();
  const elemTop = rect.top;
  const elemBottom = rect.bottom;

  // Only completely visible elements return true:
  const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  // Partially visible elements return true:
  //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
}

let startIndex = 10;
const increment = 10;
let endOfPageReached = false

async function infiniteScroller() {
  if (endOfPageReached) return;

  const url = window.location.href;

  const server = process.env.SERVER_URL || "http://localhost:3000";
  const data = await fetch(server + "/home/next-posts", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      startIndex,
      increment,
      url
    })
  })

  console.log(startIndex, increment)

  const response = JSON.parse(await data.json())

  // End of page reached
  if (response.warning) {
    endOfPageReached = true;
    return;
  }

  const container = document.querySelector('#main-container')

  response.htmlArray.forEach(html => {
    container.insertAdjacentHTML('beforeend', html)
  })

  addPostEventListeners()
  startIndex += increment;
}