# GithubApiExplorer
Explore organizations, users, repositories and commits on Github using the Github API

## Installation
To use the explorer, host it locally using XAMPP or an equivalent web server solution stack of your choosing.

## Improvements
Most useful to users is that they get the data that they require in the most concise, complete, efficient and user friendly way possible. If we assume that the data provided is the data requested (otherwise see section additional feature for Additional tables and data) then the most important improvements to be done is to add additional data and to improve the interface to make the application more user friendly and intuitive.

### Additional pages
There can only be a maximum of 100 items fetched per page fetched, i.e. every time we call the API. In order to fetch the next 100 items, the next page, we need to make another call. One way to implement this is to add buttons above the table that, when clicked, issue new fetches to get the page before and after the current one. 

### Interface
It could be more clear what needs to be used as the input for the searches. Users may believe that they need to input a username when searching for users, when they are actually supposed to input the name of an organization or repository.
It could also be made more clear what is being listed. Something like "Found 30 users associated with organization google" may be printed each time we make a search for users by organization using the search word "google". This field of information could be placed just above the table to make it really clear what is being presented.

### Code
The code includes a lot of duplication. For example, the php could be shortened to an array of things to be printed and a for each loop, since users, repositories, organizations and commits all include a table, a search row etc. which could be rendered according to page using for example a map to connect them correctly.


## Additional Features
### Sorting
There could be different ways of sorting the items, other than alphabetically. The problem with this is that the fetches only receive one page at a time, which means it would not consider all the data when sorting.
### Additional tables and data
There are many more things that could be added to the tables and other tables that could be explore, like comments or issues related to a certain commit or repository. There are also other data to add to the table. This is trivial and depends on the users needs and requirements.
