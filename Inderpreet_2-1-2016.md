Hackathon Win! Ishwerdas Studio
===============================

A first time hackathon was organized by TCY Online. 
He, Inderpreet Singh, himself and his team members from Ishwerdas Studio participated in it. 
It costed them 250$. "Hackathon was an investment, we went there without any intension of winning but to have fun.", he said.
Then he started telling about their project they made at Hackathon. 
He started with the example of Etherpad (an web-based text collaboration platform).
Their project was something similar like Etherpad but with some nice typography. 
But instead of writing code in it, we write English grammar and it'll hightlight nouns, verbs, pronouns etc.
"At Ishwerdas, we do brainstorming at the very beginning, regarding ideas.
So at hackathon, we did the same and filtered out some ideas.
Project name was `Lord Byron`. [Lord Byron](https://en.wikipedia.org/wiki/Lord_Byron) was a poet and father of the first computer programmer, 
[Ada Lovelace](https://en.wikipedia.org/wiki/Ada_Lovelace). 
There was some 2-3 minute time to present. "We did present well! And we won".

About Ishwerdas Studio
======================

"A Studio in which we provide services". Basically there are two type of them: 

### 1. Education: 
"Trying improving education (from primary level to college level). 
Not a goal of improving actually. But we try to provide better.
Most of the revenue comes from education and by spending the least time."

### 2. Programming: 
Work in basically these technologies: JS, Ruby, C++

"Someone funded us for completing our own product, because he needs that to be built fast. 
Overhead is more when projects came as compared to teaching."

"We have no office. No boss, no hierarchy. No roles (no speciality). 
We work as a team on every project."


TCC Website
===========

###Static Site Generator: 
Small script or a software that converts some input to HTML, CSS and JS that is readable by the browser.
That some input can be any specific language like Markdown.

**Features:** 
Performance, no database, fast.

**Jekyll**: Static site generator with blog aware (we can make blogs). Made in Ruby.
It has yml files.

Loop example:
`{% for post in site.posts %}`
It's like a template.

We don't have to put template on the server. Jekyll converts the markdown and some template to HTML, CSS, JS.

**Webdioxide.com**
He owns this website. It'll be using github pages with Jekyll. 
Any number of visitors can visit an github will serve it.

**Discussion:**
We can't use a static site generator for a chatting website. For comments (services like Disqus) can be used.
If we don't update the web pages much frequently, 
then why to put load on the processing for fetching data from database every time.
In staic site generator a JSON file is loaded that is parsed with JavaScript on the client side.
