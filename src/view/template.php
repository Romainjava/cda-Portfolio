<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://fonts.googleapis.com/css?family=Pinyon+Script|Source+Sans+Pro:300,400,600,700" rel="stylesheet">
    <link rel="stylesheet" href="../public/dist/app.54d0b89494665e0c25b5.css">
    <title>Portfolio Romain Van-Damme</title>
</head>

<body>
    <?php include('components/header.php') ?>
    <main>
        <?php $file = "../src/view/template_main/main_" . $loc . ".php";
        if (file_exists($file)) {
            include $file;
        } else {
            echo "erreur dans le template.php contenu introuvable";
        }
        ?>
    </main>
    <?php include('components/footer.php') ?>
</body>
<script src="../public/js/app.js"></script>

</html>