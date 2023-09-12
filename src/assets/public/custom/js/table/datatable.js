

$(function () {

    $(document).ready(function () {
        var table = $('#person_table').DataTable({
            language: {
                "url": "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Turkish.json"
              }
        });
    });

    $(function () {
        addRowTable.initialize()
    })
});