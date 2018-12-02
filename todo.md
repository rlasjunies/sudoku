# TODO: list

[x] mettre en évidence les cellules dont la valeur est erronnée
[x] mettre en evidence les lignes / colonnes / block qui concerne la zone d'action de l'utilisateur  
  x change la couleur de fond
  - est-ce possible de réduire la taille des autres des autres valeurs?

[x] définir les valeurs possibles
[x] mettre en évidence la cellule sélectionnée, par rapport aux lignes/colonnes/zone
[x] mettre en evidence les chiffres quand l'utilisateur sélectionne un chiffre
[x] when the app restart, the game restart at the same stage (persist the state in the localstaorage)  
[x] informer l'utilisateur quand une area(ligne/colonne) est finie
[x] informer l'utilisateur quand le tableau est fini
[x] improve UX for continue or new game
[x] user sees when in draft mode
[ ] game board expressive header
  [x] user can easily switch to draft mode
  [ ] pouvoir annuler le dernier coup (full history?)
  [ ] player knows how long duration of the current board game
    [ ] player can pause the timer
[ ] user visualy understand action button (icons)
[x] user can leave generate board without generating a new board (back)
[ ] user can clean a cell
[ ] user can visualize the cell selected even if the cell is in error
[ ] user should visualize when he click in the keyboard keys (click effect missing)

[ ] si toutes les occurences d'un chiffre sont remplis alors supprimer le chiffre du clavier 
[ ] interdire l'écrassement d'une valeur donnée initialement
[ ] mettre les valeurs initiales dans une couleur légèrement différente
[ ] clavier spécifique pour le mode brouillon. Aprés 1 sec faire appraitre la liste des possibles, des impossibles

[x] proposer la génération de nouveau tableau quand le jeu commence
[x] splash screen navigate to current board if any
[x] create new board page
[ ] player can continue playing easily after ending a game

[ ] user can play on small device
  * (resize the table depend on the siez of the screen)
  (mediaquery)
  * put the "keyboard" on the side when 

[ ] player can access to the sudoku from web browser
[ ] convert to PWA
[ ] revenus are made from the application
[ ] player are "pushed" to come back in the app

[x] all pages of the program are based on acc-page
[x] create a nicer button with ripple
[ ] operator enjoy a new slide button
[ ] create a concept de page. Classe de base avec méthodes; show, hide, open, close, navigateTo, history, back
[ ] unit tests
[ ] e2e tests
[ ] remove the stenciljs and rely in the statelgt framework?

# FIXME: 

[x] when starting the cell is selected
[x] reinitiliaze the candidates same time as the board
[x] wrong highlight when selecting "empty" cell
[x] cellule incorrect n'apparait pas tout le temps
[x] cell become incorrect when value re typed