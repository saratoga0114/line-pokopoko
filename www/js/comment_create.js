/**
 * コメント更新(新規作成)
 */
function comment_check_and_submit() {
    var max_comment_info_num = 140;
    var comment_info = $.trim($('#comment_info').val());
    var error_msg = '';

    if (comment_info === null || comment_info === "" || comment_info == document.getElementById('comment_info').defaultValue) {
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
    $("#comment_info").css('color', '#999');

    $("#comment_info").focus(function() {
        if ($(this).val() == document.getElementById('comment_info').defaultValue) {
            $(this).css('color', '#000').val('');
            $(this).attr('rows', '3');
        }
    }).blur(function() {
        if (jQuery.trim($(this).val()) === "") {
            $(this).css('color', '#999').val(document.getElementById('comment_info').defaultValue);
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

    // コメント投稿
    $("#comment_submit").on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        var result = comment_check_and_submit();
        if (!result) {
            return false;
        }

        var comment_info = $.trim($('#comment_info').val());
        var cid = $.trim($('#cid').val());
        var pid = $.trim($('#pid').val());

        $.ajax({
            type: "POST",
            url: '/api/comment',
            data: {
                "cid": cid,
                "pid": pid,
                "comment_info": comment_info
            },
            success: function(data) {
                if (data.code == "500") {
                    alert(data.info);
                    return false;
                } else {
                    alert('投稿しました。確認後掲載されます。');
                    location.reload();
                    return false;
                }
            },
            error: function() {
                alert('投稿に失敗しました。');
                return false;
            }
        });
    });
});
