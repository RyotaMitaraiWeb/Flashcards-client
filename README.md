# Flashcard-Client
This is a React application that simulates flashcards—cards used for memorizing a lot of content in a short amount of time

## Installation

To run the React application, download the project and run:

```bash
npm install
npm start
```

In addition, you need to download and run the server associated with this project. Check out [its repository](https://github.com/RyotaMitaraiWeb/Flashbacks-server) to learn more about running it.

**Note:** the application will be launched on http://localhost:3000/Flashcard-client (which is a non-existant URL). Simply navigate to the index (or any other) page to see a web page render

## Application structure (folders)

### app
The app folder contains the Redux logic. This project uses Redux toolkit, thus it separates each feature in its own slice.

#### ``mobileMenu``
This slice maintains the global state of the mobile navigation menu; more specifically, it toggles it on and off and also locks the body of the page so that the user cannot scroll while the menu is open

##### Methods
###### toggleModal(payload)
`toggleModal` accepts a ``payload`` boolean argument and toggles the menu's visibility

###### hideModal()
`hideModal` sets the `isToggled` state to `false`

#### ``newFlashcard``
This slice maintains the state of a submission's title and description. The state resets upon the form's unmounting

##### Methods
###### updateBasicInfo(payload)
Accepts a ``payload`` with ``title`` and ``description`` and sets the current state with those values

###### restartBasicInfo()
Restarts the state of the slice. Always called when the form unmounts.

#### ``user``
This slice maintains info about the user

##### Methods
###### updateUser(payload)
Accepts a ``payload`` with ``username`` and ``id`` and sets the current state with those values

###### updateToDefaultPreference()
Restarts the state of the slice to `purple`, `light`, and `vertical`, respectively.

#### ``newFlashcard``
This slice maintains the state of a submission's title and description. The state resets upon the form's unmounting

##### Methods
###### updateBasicInfo(payload)
Accepts a ``payload`` with ``title`` and ``description`` and sets the current state with those values

###### logout()
Restarts the state of the slice. Called when the user logouts.

### hooks
This folder contains custom hooks that can be used in the components.

#### ``useCloseMenu``
Closes the mobile menu when called

#### ``useShuffler(arr, run)``
Shuffles an array, in this case, an array of flashcards. The hook uses the Fisher-Yates algorithm for shuffling an array, meaning that each particular permutation has the same chance of occuring as the other ones. The hook accepts two arguments: the array and a boolean value that indicates whether to shuffle the array.

#### ``useDateFormatter(date)``
Formats the ``createdAt`` and ``updatedAt`` properties of a deck. It takes the first ten characters and reverses the format.

### Services
Services are functions that are not necessarily hooks; that is, they are often run in callback functions.

#### ``requests.js``
``method(relativeEndpoint, body?)``
Provides ``get``, ``post``, ``put``, and ``delete`` functions to make the respective HTTP requests. All of them return an object with the response and (if applicable) the data that the server returned. If ``body`` is provided, it will be stringified and sent to the server, which may then read its content

The functions all send and receive cookies to/from the server.

#### ``auth.js``
Provides a ``login``, ``register``, and ``logout`` functions, which make the respective requests. Login and register accept one argument, a body, while logout does not accept any arguments.

#### `validation.js`
Provides various functions to validate user input. ``validateEmail`` accepts the event as an argument (it uses the built-in validator of HTML to validate it). ``checkIfUserExists`` accepts two arguments: ``attribute``, which should be either ``username`` or ``email``, and the value of the attribute. The rest accept a string as an argument. All functions either return an error message as a string or an array of error messages.

### RouteGuards
Provides component wrappers that validate whether the user is logged in or not and thus determine if the user should proceed further. The components are wrapped around the targetted components in the ``element`` attributes of the ``Route`` components

``LoggedInGuard`` will let in a user only if they have a non-empty id in the global state, while ``GuestGuard``, respectively, will let in a user only if they have an empty id in the global state.

### Components
Read next section for more information

## Components
### Auth components
Provide Login, Register, and Logout components. None of them accept any props as arguments. Logout does not render any particular view and, instead, sends a request to the server to logout the user and then redirects the user to the home page.

### Button
Provides a button component that is to be used on Login and Register. Accepts ``props.children`` and ``props.disabled``, which is a boolean value to determine if the button is disabled.

### Catalog
Renders a list of ``Flashcards`` components that lead to the respective entry, does not accept any props.

### Container
Wrapper component that provides a background color and a limited size within the viewport. Accepts ``props.children``.

### Create
Props-less component that renders either a ``FlashcardForms`` component or a ``BasicInfoForm`` component, depending on when the user clicks "Continue". Upon unmounting, it will restart the ``newFlashcard`` global state.

### Deck
#### DeckInfo
Renders information about a particular entry (deck) on its page. Does not accept any props. When the component renders, it sends a request for the paricular deck and then loads it into the view. The user can bookmark the deck if they are logged in and not the author and also unbookmark if it they have bookmarked it. The user can also shuffle the deck before starting a session.

Clicking "Start session" will cause the component to instead render a ``Session`` component

#### DeckPreview
Renders a preview of the user's own or saved deck in the home page. Accepts ``props.deck``. If the user is the author of the deck, the component renders buttons for edit and delete, otherwise, it renders a button to unbookmark the deck. The ``h1`` is a hyperlink to the specific entry

### Delete
A component that does not render anything. It will try to delete a particular entry and then redirect the user to the home page. This action can only be done by the author of the particular entry.

### Edit
Works in a similar way to the ``Create`` component, but instead renders an edit form when transitioning and fills in all fields with the entry's relevant values.

### Feedback
Provides two components, ``Error`` and ``Valid``, which are used to indicate validity of particular fields. ``Valid`` accepts a ``props.valid`` boolean attribute, which determines whether it renders or not. ``Error`` accepts a ``props.valid`` and **inverts** it. The Error component renders if it has ``props.children`` and the inverted boolean value is ``true``

### Flashcard
#### Head and Body
Head is the "handle" of a card. It matches the color from the user's ``colorTheme`` preference. Body is the card part and also where the content appears.

Both accept ``props.context``, which should be either ``card`` or ``preview`` (used when rendering them on the home page). When used for creating flashcards, you must also pass a ``props.focus`` handler, which sets the focus to the form inside the card when any part of the card is clicked.

Body also accepts ``props.children``.

### FlashcardForm (folder)
#### BasicInfoForm
The BasicInfoForm renders a form for the title and description of the deck. It can optionally accept an object with the deck and flashcards (the latter of which it will pass to the ``FlashcardForms`` component) as a prop when used in the context of editing (in which case it will fill out the fields with the relevant values).

#### FlashcardForm
Renders a ``Flashcard`` component with a ``textarea`` inside it. Can accept a ``props.flashcards`` with a ``side`` attribute and, in the context of editing, ``props.content`` to fill out the field.

#### FlashcardForms (``All`` folder)
Renders two ``FlashcardForm`` components: one for the front side and one for the back side. The component also renders arrow buttons to switch through the current flashcards

``props.endpoint`` determines whether the component is used to create or edit a deck. The accepted values are ``create`` and ``edit``

``props.deck.flashcards`` is an optional prop used in the context of editing to generate the existing flashbacks

The component uses a counter to track which flashcard is being created/edited. The component always renders one pair of ``FlashcardForm`` components, but passes it as props the data at index ``counter`` of the data array.

The data array is not directly mutated, but rather, on each change, a copy of it is created, has the corresponding index of data changed, and then updated as the new state.

### Footer
Renders the footer of the application. Matches the color theme of the user. Does not accept any props.

#### Anchor
A list item with a hyperlink that leads to one of the static pages. Accepts a ``href`` prop, which is the endpoint of the hyperlinked page.

### Header
Renders the header of the application. Matches the color theme of the user. Does not accept any props.

#### ``NavLogged``, ``NavGuest``
Navgation menus that render, depending on if the user is logged in or logged out. The ``Navigation`` component uses the global state to determine which one to render

#### ''NavItem''
Works the same way as the ``Anchor`` component, but is used within a ``NavGuest`` or ``NavLogged`` component

### ''Home''
Renders a link to the catalogue, the user's created or saved decks (if they are logged in), a filter via title field, and a link to a random deck. The rendered decks will either display buttons for edit/delete or a button to unbookmark.

The filtering happens on the client-side, it does not make requests to the server. The filtering is case insensitive

### ''Icon''
Renders a Font Awesome icon. Accepts a ``props.icon``, which evaluates to ``fa fa-[icon-of-your-choice]``

### ''Random''
Redirects the user to a random deck

### ``Session``
Renders a ``Flashcard`` component and two arrow buttons. The arrow buttons increment or decrement the counter of the component. The Session component always renders one Flashcard component, but passes as props the data at the particular index of the array.

If the flashcard is flipped to the back side, the arrow buttons will flip the card to the front while changing the counter

The component accepts a ``props.deck.flashcards`` prop. It does not shuffle the deck, but rather, the parent component should take care of that.

## License
[MIT](https://choosealicense.com/licenses/mit/)