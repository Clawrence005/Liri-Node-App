# Liri-Node-App #
What the project does

LIRI is a Language Interpretation and Recognition Interface. **LIRI is a command line Node JS app** that takes in parameters and gives you back data from web APIs about:
- Songs and artists from spotify,
- Bands and the venues they are performing at.
-  Movies and the generic information about its plot, actors, etc. 

### The APIS Used: ###
LIRI will search: 
- *Spotify* for songs 
- *Bands in Town* for concerts
- *OMDB* for movies

### The CommandLine: ###
In the command line start by typing the words **node** then **liri** followed the **command** and finally the **parameter** of what you are searching for. Note that there is a space between each word.
- `command = the search command how LIRI will search`

- `parameter = the search parameter that LIRI will search for`

### The Commands: ###

- `concert-this parameter`
- `spotify-this-song parameter`
- `movie-this parameter`
- `do-what-it-says`

---

**the command entered in the command line with the parameter Airplane**
![movie-this aiplane](/assets/Screen-Shot-7.png "movie-this airplane")


**the results from LIRI for the parameter Airplane:**
![the results for airplane](/assets/Screen-Shot-6.png "the results for airplane")
---
**`concert-this parameter`**

>**concert-this** followed by band name **parameter** 
>will show information about a band's performances.

under construction!:
![concert-this command](/assets/Screen-Shot-2.png "command line concert-this and result")
---
**`spotify-this-song parameter`**
>**spotify-this-song** followed by song name **parameter** 
>will show information about song being searched.

![spotify-this-song command](/assets/Screen-Shot-3.png "command line spotify-this-song and result")
---
**`movie-this parameter`**
>**movie-this parameter** followed by movie name **parameter** 
>will show general information about the movie being searched.

![movie-this command](/assets/Screen-Shot-4.png "command line movie-this and result")
---
**`do-what-it-says`**
>**do-what-it-says**  
>will show the information inside the file **random.txt**.
>the default is set to run the *spotify-this-song* for *"I Want it That Way"* by *the Backstreet Boys*.

under construction!:
![do-what-it-says command](/assets/Screen-Shot-5.png "command do-what-it-says and result")
---
### Log: ###
>**do-what-it-says**  
>Every query to LIRI will log the information inside the file **log.txt** and reflects what is printed to the node command line.

### Troubleshooting: ###
>make sure to have a command and a parameter and leave spaces in between. Use dashes where appropriate--
i.e. in commands. 

![invalid command](/assets/Screen-Shot-1.png "invalid command, no command or parameter")

**The correct format in the command line**
The **spotify-this-song** command and the parameter **phone** in the command line.

![spotify-this-song in action](/assets/Screen-Shot-8.png "[spotify-this-song in action")

Enjoy your queries!! 


