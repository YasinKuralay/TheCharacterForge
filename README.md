# TheCharacterForge
##### A modern text editor for creating characters

***This README serves as a simple explanation of the project. Detailed explanations of the code will not be served here, they will be added as comments inside the files.***

- *It is worth noting that this project started the moment the developer started learning the basics of React. Thus, there are some inconsistencies in the code. For example, login files are written with Class Components while most of the project is making use of Function Components.*

### Purpose

The projects purpose is to provide writers a space dedicated to creating and/or improving characters by writing about their qualities, backgrounds, the way they act, think, respond etc. without worrying about writing the actual script. The way this is achieved is by introducing a concept called 'Cards'. Cards are little windows with a heading and a body that serve as dedicated spaces for writing about one single attribute of the character. The windows can't be resized, but the bodies have an input field with its scroll attribute set to auto. This is intentional and serves the purpose of forcing the author to keep unrelated info in separate windows, or 'Cards'.

These Cards can be flipped, and any type of notes can be written on their back. The cards can be freely dragged and dropped across the screen. Thus, the author can place cards anywhere and work on them on the Viewport as pleased. To avoid bugs, certain limits to this will be introduced in later builds. At this time, the only limit is the number of cards that can be opened simultaneously.

### Data Management

Everything on the cards is saved when the user closes the card by clicking the X on the right upper corner. This will be changed to also take a form of autosave.
There is only one SELECT query performed in the app; when the user loads a workspace by clicking on a character. After this, every time the user saves content, an INSERT query is performed and the state of the parent component -the workspace- is updated to include the changes. This serves to prevent having to perform several SELECT queries.

### Landing Page

The landing page at the time of writing is incomplete and has only 2 buttons: One for creating a new character and one for accessing existing characters. The priority currently is on the functionality of the app, therefore the landing page will be updated at a later time.
