<?php
  include "db.php";


  // Accès à la base de données
  
  if(isset($_GET['saveJoueur']) 
    && isset($_GET['nom']) 
    && isset($_GET['prenom'])
    && isset($_GET['pseudo']) 
    && isset($_GET['mail'])
    && isset($_GET['pseudo']) 
    && isset($_GET['passw'])
    && isset($_GET['vie']) 
    && isset($_GET['exp'])
    && isset($_GET['niveau']) 
    && isset($_GET['force'])
    )
  {
      $saveJoueur = "INSERT INTO joueur (id, nom, prenom,pseudo, mail, passw, vie, exp, niveau, strength) VALUES (
        NULL, '".
        $_GET['nom']."', '".
        $_GET['prenom']."', '".
        $_GET['mail']."', '".
        $_GET['pseudo']."', '".
        $_GET['passw']."', '".
        $_GET['vie']."', '".
        $_GET['exp']."', '".
        $_GET['niveau']."', '".
        $_GET['force']."');";

      $reponse = $pdo->exec($saveJoueur);
      echo $reponse;
  }

  ?>