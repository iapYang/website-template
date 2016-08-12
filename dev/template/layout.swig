<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>
        {% block title %}
        Layout Title
        {% endblock %}
    </title>

    <link rel="stylesheet" href="style/style.css">
</head>
<body>

    {% block content %}
    <p>Layout Content</p>
    {% endblock %}
</body>
</html>
