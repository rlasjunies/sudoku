
https://sudoku-accurentis.firebaseapp.com

# Generate the PWA
[] npm run build
/*** ne marche pass **/

npw stencil build
firebase deploy

# PWA know how

https://stackoverflow.com/questions/21125337/how-to-detect-if-web-app-running-standalone-on-chrome-mobile#
function isRunningStandalone() {
    return (window.matchMedia('(display-mode: standalone)').matches);
}
...
if (isRunningStandalone()) {
    /* This code will be executed if app is running standalone */
}

# sudoku rule solver
http://www.paulspages.co.uk/sudoku/howtosolve/#Stage2

difficile à comprendre mais semble lister quelqes règles intéressantes
https://books.google.fr/books?id=AFHrGY6VZPgC&pg=PA21&lpg=PA21&dq=sudoku+accurate&source=bl&ots=JsSoVECSRo&sig=juxPnoDaYlKXY0OFa9kgVvZQj_I&hl=fr&sa=X&ved=2ahUKEwjHseGhvcLfAhWGSRUIHVEuB2QQ6AEwBHoECC0QAQ#v=onepage&q=sudoku%20accurate&f=true


inspire by:

# state management posts

https://medium.com/@gilfink/creating-shared-state-in-stencil-3beac77477e8
https://medium.com/@gilfink/quick-tip-using-prop-context-in-stencil-6764f6e2e981

https://css-tricks.com/build-a-state-management-system-with-vanilla-javascript/

# pwa
https://github.com/ionic-team/ionic-pwa-toolkit#getting-started
https://www.aligneddev.net/blog/2017/pwa-links/


https://www.joshmorony.com/building-a-pwa-with-stencil-an-introduction-to-stencil/

# UI / UX - Clarity project

https://vmware.github.io/clarity/


# tests

How to debug the services (not sure, not tested, for the components and E2E), installation of the extension Jest
This will run in the backgroud the tests founds *.spec.ts
To debug just click in the codelens above the tests
> the code lens is shown based on the settings of the extension. Goes in settings if you would like to have the codelens shown also for "pass" or other state

En cas de soucis, supprimer la configuration qu'il y a dans launch.json
Par défaut l'extension n'utilise pas de configuration,
En cliquant sur l'icon play(>) dans la barre d'état le plugin demande quelle config on veut utiliser
Dans le fichier de configuration launch.json, 
* ajouter une nouvelle configuration
* l'extension ajoute un snippet de configuration pour vscode-jest-tests
* le prendre, 
généralement cela marche 
