function alert(message, type, temporary = true) {

    closeAlert();

    var alertPlaceholder = document.getElementById('alert-placeholder');
    var wrapper = document.createElement('div');

    wrapper.innerHTML = [
        `<div id="alert" class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('');

    alertPlaceholder.append(wrapper);

    if (temporary) {
        alertTimeout = setTimeout(() => {
            closeAlert();
        }, 10000);
    }

}

function closeAlert() {
    var alert = new bootstrap.Alert('#alert');
    if (document.getElementById('alert') != null) {
        alert.close();
        clearTimeout(alertTimeout);
    }
}

var date = new Date();

$('#from-hour').val(date.getHours());
$('#from-minute').val(date.getMinutes());

$('#btn-submit').click(function (event) {

    event.preventDefault();

    let fromHour = parseInt($('#from-hour').val());
    let fromMinute = parseInt($('#from-minute').val());

    let toHour = parseInt($('#to-hour').val());
    let toMinute = parseInt($('#to-minute').val());

    if (fromHour < 0 || fromHour > 23 || fromMinute < 0 || fromMinute > 59
        || toHour < 0 || toHour > 23 || toMinute < 0 || toMinute > 59) {
        alert("<strong>Ops!</strong> Informe valores de hora e minuto válidos.", "danger");
    }

    fromHour = fromHour + fromMinute / 60;
    toHour = toHour + toMinute / 60;

    let diff = fromHour < toHour ? toHour - fromHour : 24 - fromHour + toHour;

    let diffHour = Math.floor(diff);
    let diffMinute = Math.floor(diff % 1 * 60);

    let result = "";

    if (diffHour > 0) {
        result += `${diffHour} horas`;
    }

    if (diffHour > 0 && diffMinute > 0) {
        result += " e ";
    }

    if (diffMinute > 0) {
        result += `${diffMinute} minutos`;
    }

    $('#result').html(result)

});
