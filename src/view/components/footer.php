<footer class="footer">

    <ul class="footer__burger--list">
        <?php if (isset($loc)) :
            $array = ["presentation", "realisation", "veille", "cv"]; ?>
            <li>
                <a href="index.php?loc=presentation"> <img src="../public/assets/icon/m_pres.png"> Présentation</a>
            </li>
            <li>
                <a href="index.php?loc=realisation"><img src="../public/assets/icon/m_rea.png"> Realisation</a>
            </li>
            <li>
                <a href="index.php?loc=veille"><img src="../public/assets/icon/m_vei.png"> Veille</a>
            </li>
            <li>
                <a href="../public/veille/RVD_CV_DEV.pdf"><img src="../public/assets/icon/m_cv.png"> CV</a>
            </li>
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