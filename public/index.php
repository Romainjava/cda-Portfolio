<?php
$loc = filter_input(INPUT_GET, "loc");
if (!$loc) {
    $loc = "presentation";
}
include("../src/view/template.php");
