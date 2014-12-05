<?php
  include "db.php";


  // Accès à la base de données

  
  if(isset($_GET['upJoueur']) 
    && isset($_GET['id']) 
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
      $upJoueur = "UPDATE `joueur` 
      SET `nom` = ".$_GET['nom'].",
      `prenom` = ".$_GET['prenom'].",
      `pseudo` = ".$_GET['pseudo'].",
      `mail` = ".$_GET['mail'].",
      `passw` = ".$_GET['passw'].",
      `vie` = ".$_GET['vie'].",
      `exp` = ".$_GET['exp'].",
      `niveau` = ".$_GET['niveau'].",
      `strength` = ".$_GET['force']." WHERE `joueur`.`id` = ".$_GET['id'].";";
      echo $upJoueur;
      $reponse = $pdo->exec($upJoueur);
  }

  ?>