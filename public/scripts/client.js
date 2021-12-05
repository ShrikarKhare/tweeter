/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const loadTweets = () => {
    $.get('/tweets/', (data) => {
        return renderTweets(data);
    })
}
const renderTweets = (tweets) => {
    // loops through all tweets
    for (let i = 0 ; i < tweets.length; i++) {
        // calls createTweetElement for each tweet
        // takes return value and appends it to the tweets container
        $('.alltweets').prepend(createTweetElement(tweets[i]));
    }
}
const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
const createTweetElement = (tweetobject) => {
    let tweetprofilepic = tweetobject.user.avatars;
    let username = tweetobject.user.name;
    let userhandle = tweetobject.user.handle;
    let tweettext = escape(tweetobject.content.text);
    let tweettime = tweetobject.created_at;
    let tweets = $(`
        <article class = tweet-container tweet flex>
            <header id="tweetheader">
                <span>
                    <img id = 'tweeterprofilepic' class = 'user-profilepic' src =${tweetprofilepic}/>
                </span>
                <h2 id = 'tweetername'>${username}</h2> 
                <h2 id = 'tweeterhandle'>${userhandle}</h2>
            </header>
            <span class ="tweet-content">
                <p> ${tweettext} </p>
            </span>
            <footer id = 'tweetfooter'>
                ${timeago.format(tweettime)}
                <span id = 'icons'>
                    <i id = 'flagicon' class="fas fa-flag"></i>
                    <i id = 'retweeticon' class="fas fa-retweet"></i>
                    <i id = 'hearticon' class="fas fa-heart"></i>
                </span>
            </footer>
        </article>
    `);
    return tweets
}
$(document).ready(() => {
    loadTweets();
})
const toggleTweetComposer = () => {
    $(".new-tweet").slideToggle();
    $('textarea').focus();
}
const postTweet = event => {
    event.preventDefault();
    let newtweet = $('#newtweet-text').val().length
    //only post tweets within character limit
    if(newtweet >  0) { //there is a max character length for text area so no need to check for < 140
    $.post("/tweets", $('#newtweet-text').serialize(), (data) => {
            //empty the composer box after successful tweet 
            //after pushing data to database, run the rendering tweets again to show all tweets
            $('#newtweet-text').val("")
            $('.alltweets').val("");
            loadTweets();

            // $(".new-tweet").slideUp();//toggles back up after submit
        }).done(function() {
            $('.new-tweet').find('.counter').text('140');
        });
    } else {
        alert ("Tweet cannot be empty");
        return;
    }
}
$("#doubledownicon").on("click", toggleTweetComposer);
$('#composetweet').on("submit", postTweet);