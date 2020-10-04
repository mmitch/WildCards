## milestone: can die

* add Player with name and score
* start game entry in main menu switches to new battle view
* enter player name, create new player
* random win/lose in a battle
* on win: increment score, battle again
* on lose: write highscore (refactor HighscoreService to accept Player object instead of various parameters)

## milestone: continue

* on win: ask save/continue
* on continue: battle again as before
* on save: write Player to LocalStorage
* add restart option to main menu (only of Player is currently saved)
* extract Player creation (ask for name) to extra component
* warn when creating a new Player while a saved game exists

## milestone: minimal game

* versionize Player object
* disallow reload of older Player (show message?)
* add player health
* implement real battle against a stock enemy
* implement a Deck class

## milestone: useful game

* add magic points
* add special cards

## milestone: monsters

* add multiple monsters
* choose at battle start
* add monster ai/different behaviours

## milestone: environment

* define battle routes with different monsters
* choose route before battle
* while on route: do multiple battles
* after route: return to route chooser
* remove monster chooser at battle start (now defined by battle route)

## concrete todos

* `TitleComponent` should show license (also: add license everywhere)
* `TitleComponent` should refer to original game/Play Store app

## more stuff/backlog (create milestones for this)

* add boss monsters
* randomize monsters on battle route from a pool per route
* randomize individual monsters (health, attack etc.)
* add items
* add experience/levelups
* add gold + shops (health? items?)
* drop items from enemies
* add special cards to monsters
* add CSS/style individual views
* support landscape/portrait screens

## global stuff

* main menu: component for list-selection  
  combine radio-style selection (up/down/enter) with clickable buttons
* support mouse-only usage
* support touch-only usage
* support keyboard-only usage (individual keys)
* support arrow-keys+enter usage

## mysteries

* make `LeadingZeroPipe` work when used in `HighscoreTableComponent` for the score

* in components, test only the `.ts` file or `.ts` plus `.html`?
  * `component.onEvent() ... expect(component.value).toBe('x')` or
  * `html.querySelector('button').click() ... expect(html.querySelector('div#value').textcontent).toBe('x')` ?

* why do the tests have two `beforeEach()` methods?  
  `async` for setting up the `TestBed`, then another normal one for setting the instance variables/fields