
https://www.flaticon.com/free-icon/sudoku_103253

License free with attribution,
should appears in the about ... 
need to create about

<div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>


# host

* in firebaseapp.com, goes connecter to another domain
* from here follow the wizard, it will end providing you the TXT, and long string
* in LWS, in Gestion domain > Zone DNS, add the record:
  * Type:TXT
  * Nom:@
  * Valeur:...The value from firebaseapp.com
  * TTL:let the default value
* wait ... hours
* firebaseapp.com, comeback on the same screen and collect new records to put in LWS
  * 2 records Type:A, Name:sudoku-master.com, Valeur:...ip valie from firebase, TTL:default
  * N'oubliez pas de supprimer vos anciens enregistrements A et tous vos enregistrements AAAA de votre fournisseur DNS
  * Ajoutez ces enregistrements A à votre domaine en accédant à votre fournisseur de DNS ou à votre service d'enregistrement de noms de domaine. Un message d'avertissement lié au certificat de sécurité s'affichera sur votre site pendant quelques heures, jusqu'à ce que vous fournissiez ce certificat.
