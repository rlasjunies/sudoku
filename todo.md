# TODO: list

[x] player knows the duration of the game
[x] player can pause the timer

[ ] Think about 2 modes of game
  - electronic sudoku ... with not help only replacing the paper ... no error raised when typing
    the system can check on demand or at the end
  - on typing the system check if the values entered are good, raised error if not, manage kind of number of error max
[ ] Error is raised when the value entered is not the one expected 
[ ] celebrate the end of the game
  unselect cell, to show the whole board
  when the game is finished, hide the "clear button"

[ ] generator evaluate the complexicity of the resolution based on rules

[ ] Style / UI
  [ ] candidates color should be less attractives compare to the initial/entered values
  [ ] user can visualize the cell selected even if the cell is in error
  [ ] user visualy understand action button (icons)
  [ ] user should visualize when he click in the keyboard keys (click effect missing)

[ ] UX
  [ ] user is notified when a block is completed
  [ ] system remove candidate value when the number is typed in the row, column or block
  [ ] clavier spécifique pour le mode brouillon. Aprés 1 sec faire appraitre la liste des possibles, des impossibles
  [ ] system shows how many numbers are left for a specific number

[ ] coach
  [ ] shows how many cells have one candidates
  [ ] shows how many cells have one candidates because other values are not possible by side effect
    ( unicity on another zone)
    * if a value is mandatory only in one row / column of a block. It's not a candidates in the other blocks of the row/column

[ ] user can play on small device
  * (resize the table depend on the siez of the screen)
  (mediaquery)
  * put the "keyboard" on the side when 

[ ] player can continue playing easily after ending a game

[ ] player can access to the sudoku from web browser (publish on webportal)
[ ] convert to PWA
[ ] revenus are made from the application
[ ] player are "pushed" to come back in the app (daily challenge)

[ ] create a concept de page. Classe de base avec méthodes; show, hide, open, close, navigateTo, history, back
[ ] unit tests
[ ] e2e tests
[ ] remove the stenciljs and rely in the statelgt framework?


[x] game board expressive header
  [x] user can easily switch to draft mode
  [x] pouvoir annuler le dernier coup (full history?)

[x] user can leave generate board without generating a new board (back)
[x] user can erase a cell value and candidate
[x] si toutes les occurences d'un chiffre sont remplis alors supprimer le chiffre du clavier 
[x] interdire l'écrassement d'une valeur donnée initialement
[x] mettre les valeurs initiales dans une couleur légèrement différente
[x] proposer la génération de nouveau tableau quand le jeu commence
[x] splash screen navigate to current board if any
[x] create new board page
[x] all pages of the program are based on acc-page
[x] create a nicer button with ripple
[x] mettre en évidence les cellules dont la valeur est erronnée
[x] mettre en evidence les lignes / colonnes / block qui concerne la block d'action de l'utilisateur  
  x change la couleur de fond
  - est-ce possible de réduire la taille des autres des autres valeurs?

[x] définir les valeurs possibles
[x] mettre en évidence la cellule sélectionnée, par rapport aux lignes/colonnes/block
[x] mettre en evidence les chiffres quand l'utilisateur sélectionne un chiffre
[x] when the app restart, the game restart at the same stage (persist the state in the localstaorage)  
[x] informer l'utilisateur quand une area(ligne/colonne) est finie
[x] informer l'utilisateur quand le tableau est fini
[x] improve UX for continue or new game
[x] user sees when in draft mode

# FIXME: 

[x] when starting the cell is selected
[x] reinitiliaze the candidates same time as the board
[x] wrong highlight when selecting "empty" cell
[x] cellule incorrect n'apparait pas tout le temps
[x] cell become incorrect when value re typed