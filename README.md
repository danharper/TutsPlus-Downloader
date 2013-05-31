**Note:** Tuts+ now have a "Download Course" feature, so this code is largely useless. But it'll remain here as an example for how to do similar things.

---

# Tuts+ Course Downloader

1. Install the extension (Window > Extensions > Developer Mode > Load unpacked extension...)

2. Browse to a Tuts+ Course page, press the "Download Course Videos" button at the top:
![](http://i.imgur.com/golXcso.png);

A new window will open while the extension loads all the course video pages and extracts the download URL. The URLs are then queued behind-the-scenes to prevent Amazon S3 timeouts. They're downloaded 2 at a time (although sometimes you may get 3/4 at the start, idk).

Just **DO NOT** close the Tuts+ Course page you clicked the download button from. And don't open another Tuts+ Course page. Both will clear your pending downloads queue, I think. I haven't tried it, but it might do.

**How do I view the pending download queue?** Go to your Extensions page, find the Tuts+ Downloader, and click the link next to 'Inspect Views'. In the new Dev Tools window which pops up, press `dQ` to view the DownloadQueue object. Or `dQ.length` to see the size of the pending queue. Or `dQ.queue` for the URLs in the queue.

**NOTE** I'd like to make improvements to this to make it easier to use (especially in viewing the pending queue), and to fix the bugs which likely exist, but I'm very busy.
