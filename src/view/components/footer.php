<footer>
    <ul>
        <?php if (isset($loc)) :
            $array = ["presentation", "realisation", "veille", "cv"];
            foreach ($array as $element) : ?>
                <li>
                    <a href="index.php?loc=<?= $element; ?>"> <?= $element ?> </a>
                </li>
            <?php endforeach ?>
        <?php endif ?>

    </ul>
</footer>