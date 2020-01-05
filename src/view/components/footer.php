<footer class="footer">

    <ul class="footer__burger--list">
        <?php if (isset($loc)) :
            $array = ["presentation", "realisation", "veille", "cv"];
            foreach ($array as $element) : ?>
                <li>
                    <a href="index.php?loc=<?= $element; ?>"> <?= $element ?> </a>
                </li>
            <?php endforeach ?>
        <?php endif ?>

    </ul>
    <div class="footer__burger">
        <span></span>
        <span></span>
        <span></span>
    </div>

    <div class="footer__copyright">
        <span>&copy; All Rights Reserved To Romain Van-Damme</span>
    </div>
</footer>