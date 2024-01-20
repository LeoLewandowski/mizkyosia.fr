<!DOCTYPE html>
<html lang="en">
<head>
    <title>My works</title>
    <link rel="stylesheet" href="./css/main.css">
    <link rel="stylesheet" href="./css/index.css">
    <script src="./js/main.js" type="text/javascript"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <main>
        <h1>Hello</h1>
        <a><h2>Games</h2></a>
        <section class="projects flexibleGrid">
            <?php
                $dirs = array_filter(glob('./games/*'), 'is_dir');
                foreach ($dirs as $dir) {
                    $name = ucfirst(str_replace('-', ' ', preg_replace("/.+\//", '', $dir)));
                    echo "<a href=\"$dir\" class=\"borderGrad\">$name</a>";
                }
            ?>
        </section>
        <a><h2>School Projects</h2></a>
        <section class="projects flexibleGrid">
            <a href="https://projet-web.mizkyosia.fr" class="borderGrad">1st year Web Project</a>
        </section>
    </main>
</body>
</html>