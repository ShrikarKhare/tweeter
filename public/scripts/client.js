/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
]
const renderTweets = function(tweets) {
    // loops through tweets
    for (let i = 0 ; i < tweets.length; i++) {
        $('#tweets-container').append(createTweetElement(tweets[i]));
    }
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }
 const createTweetElement = (tweetobject) => {
    let tweets = $(`
    <article class = tweet-container>
        <header>
          <img id = 'tweeterprofilepic' src =${tweetobject.user.avatars}/>
          <p id = 'tweetername'>${tweetobject.user.name}</p> 
          <p id = 'tweeterhandle'>${tweetobject.user.handle}</p>
          <text class = 'tweet-text'> ${tweetobject.content.text} </text>
        </span>
        <span id = 'timesincetweet'>${timeago.format(tweetobject.created_at)}</span>
        <span id = 'icons'>
          <i id = 'flagicon' class="fas fa-flag"> </i>
          <i id = 'retweeticon' class="fas fa-retweet"> </i>
          <i id = 'hearticon' class="fas fa-heart"> </i>
        </header>
      </article>
     `);
    return tweets
 }
 $(document).ready(function () {
     renderTweets(data);
 })
const postTweet = () => {
    $(function() {
        const $button = $('#submitbutton');
        $button.on('click', function (event) {
            event.preventDefault();
            $.ajax('/tweets', { method: 'POST' })
            .then(function (results) {
            // function to perform 
                results.serialize();
            });
        });
    });
};