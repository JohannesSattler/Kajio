document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("Kaji JS imported successfully!");
    addAllEventListeners()
  },
  false
);

function isScrolledIntoView(elem) {
  console.log('scrollllllooo')
  const rect = elem.getBoundingClientRect();
  const elemTop = rect.top;
  const elemBottom = rect.bottom;

  // Only completely visible elements return true:
  const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  // Partially visible elements return true:
  //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
}

const firstIndex = 10;

function addAllEventListeners() {
  const posts = document.querySelectorAll('.post-holder')
  if(posts.length) {
    posts.forEach(async (post, index) => handlePostEvents(post))
  };

  document.addEventListener('scroll', () => {
    if(isScrolledIntoView(posts[posts.length - 3])) {
      console.log('is Visible')
    }
  })
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

  // chenge up/down vote buttons
  if(upOrDownVote) {
    upVote.classList.add('img-selected', 'img-upvote')
    downVote.classList.remove('img-selected', 'img-downvote')
  } 
  else {
    upVote.classList.remove('img-selected', 'img-upvote')
    downVote.classList.add('img-selected', 'img-downvote')
  }

  const data = await fetch("http://localhost:3000/home/vote", {
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