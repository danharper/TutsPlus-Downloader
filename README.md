# Tuts+ Course Downloader

1. Install the extension (Window > Extensions > Developer Mode > Load unpacked extension...)

2. Browse to a Tuts+ Course page, press the "Download Course Videos" button at the top:
![](http://i.imgur.com/golXcso.png);

A new window will open while the extension loads all the course video pages and extracts the download URL. The URLs are then queued behind-the-scenes to prevent Amazon S3 timeouts. They're downloaded 2 at a time (although sometimes you may get 3/4 at the start, idk).

Just **DO NOT** close the Tuts+ Course page you clicked the download button from. And don't open another Tuts+ Course page. Both will clear your pending downloads queue, I think. I haven't tried it, but it might do.
