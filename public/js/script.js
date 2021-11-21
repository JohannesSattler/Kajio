document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("Kaji JS imported successfully!");
    addAllEventListeners()
  },
  false
);

function addAllEventListeners() {
  const posts = document.querySelectorAll('.post-holder')
  if(posts.length) {
    posts.forEach(post => handlePostEvents(post))
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
  
  console.log(parent)

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
  
  console.log(data.status)
} 