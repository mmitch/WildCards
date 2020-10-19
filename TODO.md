# Wild Cards TODOs

## milestone: minimal game

* disallow reload of older Player (show message?)
* add player health
* implement real battle against a stock enemy using constants
* extract constants to objects (Player, Enemy, Deck)

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

* add manual/battle instructions
* add tests to battle component
* list used assets (CSS, Font) in README besides Angular

## planned e2e tests

* script happy path
* script restart with existing character

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

## learning opportunities

* use Routing instead of switching components by `Views` enum  
  deep links might not be useful, but see how the code changes, perhaps it is useful

## mysteries

* in components, test only the `.ts` file or `.ts` plus `.html`?
  * `component.onEvent() ... expect(component.value).toBe('x')` or
  * `html.querySelector('button').click() ... expect(html.querySelector('div#value').textcontent).toBe('x')` ?

* why do the tests have two `beforeEach()` methods?  
  `async` for setting up the `TestBed`, then another normal one for setting the instance variables/fields

* find the proper way for constructor overloading or any sort of different constructors in `Player`

* proper handling of missing `Player` in `BattleComponent` constructor

* how to run the same spec tests against two implementations? `StorageServiceMock` vs. `LocalBrowserStorageService`

* how to use `Date` with `JSON.parse()` / `JSON.stringify`  
  see the serialization mess in `Highscore` and   `LocalBrowserStorageService`
