<?php

$serveur     = '';
$utilisateur = 'root';
$motDePasse  = '';
$base        = 'db_dracula';
$pdo;

try
{
    $pdo = new PDO('mysql:host=localhost;dbname=db_dracula', $utilisateur, $motDePasse);
}
catch(Exception $e)
{
    echo 'Echec de la connexion à la base de données';
    exit();
}


?>