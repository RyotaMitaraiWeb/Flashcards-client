# Flashcard-Client
This is a React application that simulates flashcards—cards used for memorizing a lot of content in a short amount of time

## Installation

To run the React application, download the project and run:

```bash
npm install
npm start
```

In addition, you need to download and run the server associated with this project. Check out [its repository](https://github.com/RyotaMitaraiWeb/Flashbacks-server) to learn more about running it.

## Application structure (folders)

### ``app``
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
provides ``get``, ``post``, ``put``, and ``delete`` functions to make the respective HTTP requests. All of them return an object with the response and (if applicable) the data that the server returned. If ``body`` is provided, it will be stringified and sent to the server, which may then read its content

#### ``auth.js``
provides a ``login``, ``register``, and ``logout`` functions, which make the respective requests. Login and register accept one argument, a body, while logout does not accept any argument.

## License
[MIT](https://choosealicense.com/licenses/mit/)