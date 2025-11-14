<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendário</title>
    <link rel="stylesheet" href="/static/css/pagina.css?v=2">
</head>
<body>
    <div class="container">
        <div class="cal-wrapper">
            <div class="cal-top">
                <button class="btn-prev" id="prev">&larr;</button>
                <h2 id="mes"></h2>
                <button class="btn-next" id="next">&rarr;</button>
            </div>

            <div class="cal-days">
                <div class="day-label">Dom</div>
                <div class="day-label">Seg</div>
                <div class="day-label">Ter</div>
                <div class="day-label">Qua</div>
                <div class="day-label">Qui</div>
                <div class="day-label">Sex</div>
                <div class="day-label">Sab</div>
                <div id="grid"></div>
            </div>

            <div class="cal-bottom">
                <button class="btn-hoje" id="hoje">Hoje</button>
                <p id="data"></p>
            </div>
        </div>
    </div>

    <script src="/static/js/pagina.js?v=2"></script>
</body>
</html>
