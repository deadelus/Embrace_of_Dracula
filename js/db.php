<?php

$serveur     = 'localhost';
$utilisateur = 'root';
$motDePasse  = '';
$base        = 'db_dracula';

try
{
    $pdo = new PDO('mysql:host='.$serveur.';dbname='.$base, $utilisateur, $motDePasse);
}
catch(Exception $e)
{
    echo 'Echec de la connexion à la base de données';
    exit();
}


?>