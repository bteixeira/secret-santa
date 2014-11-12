$(function () {

    var i;
    var row = _.template($('#template-row').html());

    var $table = $('#table-names');
    var $tbody = $table.find('tbody');
    var $add = $('#button-add');
    var $submit = $('#button-submit');

    function addRow () {
        $tbody.append(row()); // TODO ID
    }

    for (i = 0; i < 3; i++) {
        addRow();
    }

    $add.click(function () {
        addRow();
    });

    $submit.click(function (ev) {
        $.post({
            type: 'POST',
            url: '/hohoho',
            data: $('#form-names').serialize(),
            success: function () {
                alert('Sent!');
            },
            error: function () {
                alert('Something went wrong, check console');
            }
        });
        ev.preventDefault();
    });

    $tbody.delegate('button.remove', 'click', function () {
        $(this).closest('tr').remove();
    });

});
