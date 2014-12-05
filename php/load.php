<?php
  include "db.php";
  // Accès à la base de données
  if(isset($_GET['loadJoueur']) && isset($_GET['pseudo']) && isset($_GET['passw'])){
      $loadJoueur = "SELECT * FROM joueur 
                      WHERE pseudo='".$_GET['pseudo']."' AND passw='".$_GET['passw']."'";

      $reponse = $pdo->query($loadJoueur);

      // Ecriture de l'objet JSON contenant les infos qui vont être renvoyées
      echo "{";
      echo "\"joueur\":";
      echo json_encode($reponse->fetchAll(PDO::FETCH_ASSOC));
      echo "}";
  }

  if(isset($_GET['loadMonstre'])){
      $loadMonstre = "SELECT * FROM monstre";
 
      // On recupere tout le contenu de la table monstre
      $reponse = $pdo->query($loadMonstre);
      
      echo "{";
      echo  "\"monster\":";
      // Ecriture de l'objet JSON contenant les infos qui vont être renvoyées
      echo json_encode($reponse->fetchAll(PDO::FETCH_ASSOC));
      echo "}";
  }

  if(isset($_GET['loadObjets'])){
      $loadObjets = "SELECT objets.id, objets.nom, type.id as typeid, type.nom as typenom FROM objets, type WHERE objets.type = type.id";
      //echo $loadObjets;
      // On recupere tout le contenu de la table monstre
      $reponse = $pdo->query($loadObjets);
      
      echo "{";
      echo  "\"objets\":";
      // Ecriture de l'objet JSON contenant les infos qui vont être renvoyées
      echo json_encode($reponse->fetchAll(PDO::FETCH_ASSOC));
      echo "}";
  }
  ?>

