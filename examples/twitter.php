<?php

$file = 'public_tweets.json';
$twitter_api = 'http://api.twitter.com/1/statuses/public_timeline.json?trim_user=true';

// Basic 5 minute caching to keep twitter from blocking us
if(!is_file($file) OR filemtime($file) < (time() - 360))
{
	file_put_contents($file, file_get_contents($twitter_api));
}

// Output the file
readfile($file);
