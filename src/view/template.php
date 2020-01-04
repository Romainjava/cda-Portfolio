<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../public/css/app.css">
    <title>Portfolio Romain Van-Damme</title>
</head>

<body>
    <?php include('components/header.php') ?>

    <?php $file = "../src/view/template_main/main_" . $loc . ".php";
    if (file_exists($file)) {
        include $file;
    } else {
        echo "erreur dans le template.php contenu introuvable";
    }
    ?>

    <?php include('components/footer.php') ?>
</body>
<script src="../public/js/app.js"></script>

</html>