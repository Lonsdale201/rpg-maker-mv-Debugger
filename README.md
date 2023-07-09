# rpg-maker-mv-Debugger
Useful debugging plug-in for the RPG MAKER MV

**Version Alpha 0.1**

With this add-on, you can monitor real-time event feedback while testing the game. It supports a wide range of event actions, and you have the possibility to use precise (start/end) hierarchical logging (only possible with manual script embedding, and no way to use this for Paralell and Autorun events yet!)

Due to the size of the logging window, and other windows, I suggest you use a higher resolution, at least while you are testing, to fit everything.

The resolution used during development:
1366 wide / 768 high.
Use for example Yanfly CoreEngine.

In addition to the log window, it also contains some additional windows that can be turned off and on:

Game time
Steps
Gold meter

### Special module window group. 
There are currently 2 groups available, and only one group can be active at a time.
These are always 3 maximum windows, which appear directly above your logging window.

In the first group you can visually track the changes of 3 items in relatime.

In the second group you can add player (leader) info e.g.: (these are also updated in real time)

**HP / MP / TP / LEVEL / ACTOR NAME / CLASS /**


**Event action Track list:**

* Switcher state
* Self Switch State
* Variables changes
* Level up / Down (both manual, and automatically)
* Item gain / Remove
* Money gain / remove
* Teleport from / to
* Waiting 
* Common event (manually)
* Erase event
* Party changed (add / remove)
* Battle LOG (win/ lose / escaped / defated mobs / battle time)

There is currently compatibility with one extension:

**Yanfly Quest Journey:**

Supported logs: plugin commands only: Completed, Added ( all three types: single, multiple, and range version plugin commands)

For objective performances, a trimming technique is still being developed, as it is not advisable to add too long entries, and the names of the objectives can be long.

**Precise manual event tracking (with end and start signals):**

**this.logEvent(this._eventId)** you need to call this at the top of your event page.
**this.finishEvent(this._eventId);** and this to the bottom of your event page.

Sample:
![image](https://github.com/Lonsdale201/rpg-maker-mv-Debugger/assets/23199033/98fd7e7c-80c0-4bc6-8291-0b1fc4ec8b98)


Unfortunately, you have to set it for each page if you want to use it.

### There is a starter log built in. It runs when you start the game. 

To do this, you need to store a var for it, because it only needs to be run once when the game starts. If you don't want to use it, set it to 0 (i.e. none).

The Starter returns the following data (this is from the player + track):

* Current Map name
* Current cooridnate
* Dash enabled / or not
* Encounters on the track
* How many people are in the party
* How much gold the player has

![image](https://github.com/Lonsdale201/rpg-maker-mv-Debugger/assets/23199033/67cba9ba-c6ff-448b-bc8a-8a1a6ddb71bc)

### Log window Informations 
One of the challenges of the logging window was solving the line break. It will happen that in some situations the line break will not be correct, I am still working on this, but these require complicated calculations.
The log window is scrollable, for which you can set two keyboard shortcuts.

In addition, there is a Smartfade technique that fades the window itself after 5 seconds of inactivity (texts are not affected)

You can turn this feature off.

It will be automatically hidden in case of dialogue, later it will be customizable.

### Event labelling

This is a labelling system that you can use to label certain events. Currently it does not handle multi-page labels, i.e. it will not overwrite if you use a different label on the pages.
(we are working on it)

Labeling works with a tiny script call: 
this.createEventLabel(1, "Hello World", "red");

The one is the ID of the event, and you can give the text a coloring if you like.

**Known issue:**

For common events, we are still working on the proper logging system, just like for traditional event parallel triggers, so you can't track them precisely yet.
