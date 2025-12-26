/**
 * コメント更新(新規作成)
 */
function comment_check_and_submit() {
    var max_comment_info_num = 140;
    var comment_info = $.trim($('#comment_info').val());
    var error_msg = '';

    if (comment_info === null || comment_info === "") {
        error_msg = 'コメントが入力されていません';
    } else if (comment_info.length > max_comment_info_num) {
        error_msg = 'コメントは140文字以内で入力してください';
    }

    if (error_msg.length > 0) {
        // エラーがあれば表示
        alert(error_msg);
        return false;
    }

    return true;
}

/**
 * 初期処理
 */
$(document).ready(function() {

    // コメント入力欄
    $("#comment_info").focus(function() {
        $(this).attr('rows', '3');
    }).blur(function() {
        if (jQuery.trim($(this).val()) === "") {
            $(this).attr('rows', '1');
        }
    });

    // 文字数カウント
    $("#comment_info").on('keydown keyup keypress change', function() {
        var _maxlength = 140;
        var _titleLen = $(this).val().length;
        $('.comment_info_count').html(_titleLen);

        if (_titleLen > _maxlength) {
            var _input = $(this).val().substring(0, _maxlength);
            $('#comment_info').html(_input);
            $('.comment_info_count').html(_maxlength);
        }
    });

    $('#comment_submit').on("click", function() {

        var $form = $('#board_submit_form');
        var fdo = new FormData($form[0]);

        if (!$('#image_file').val()) {
            fdo.delete('image_file');
        }

        $.ajax( {
            url: '/api/board',
            type: 'post',
            processData: false,
            contentType: false,
            data: fdo,
            dataType: 'json',
            success: function(data) {
                alert(data.info);
                $('#comment_info').empty();
                location.reload();
            },
            error: function(xhr, status, error) {
                alert("通信エラーが発生しました。");
                //alert('ERROR : ' + status + ' : ' + error);
            }
        });
        return false;
    });
});
