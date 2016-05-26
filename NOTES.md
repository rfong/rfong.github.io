why I didn't use your JS task runner
-----
What this is: a super minimal static site that I only wanted HTML layout/partial template compilation for. No other fancy asset compilation.

I tried out a few different ways of doing this out of morbid boredom & curiosity. Base constraints are that there's some Angular involved (just 'cuz Angular is my favorite thing for slapping together quick frontends).

1. Angular one-page app with different pages compiled out of JSON specifications -- fine but slow to load it all in one page, obviously.

2. Jekyll -- it's pretty cool and I'll definitely use it for something in the future, but it's a bit of a pain if you're using Angular since Jekyll precompiles and you have to add in a bunch of workarounds & escaping to get various components and path references to play together.

3. Mustache templating with Grunt to build -- Grunt was a huge fucking mess, and there were again minor precompilation issues and a strange bug I never figured out where absolute URLs became prepended with an additional slash, which is definitely not what you want.

4. I ended up throwing everything away in exchange for writing a few lines of Jinja run by watchdog, which is exactly the level of simplicity I wanted.
