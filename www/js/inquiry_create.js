/**
 * お問い合わせ
 */
function inquiry_check_and_submit() {
    var max_inquiry_info_num = 1000;
    var inquiry_info = $.trim($('#inquiry_info').val());
    var error_msg = '';

    if (inquiry_info === null || inquiry_info === "" || inquiry_info == document.getElementById('inquiry_info').defaultValue) {
        error_msg = '文章が入力されていません';
    } else if (inquiry_info.length > max_inquiry_info_num) {
        error_msg = '文章は1000文字以内で入力してください';
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
    $("#inquiry_info").css('color', '#999');

    $("#inquiry_info").focus(function() {
        if ($(this).val() == document.getElementById('inquiry_info').defaultValue) {
            $(this).css('color', '#000').val('');
            $(this).attr('rows', '10');
        }
    }).blur(function() {
        if (jQuery.trim($(this).val()) === "") {
            $(this).css('color', '#999').val(document.getElementById('inquiry_info').defaultValue);
            $(this).attr('rows', '5');
        }
    });

    // 文字数カウント
    $("#inquiry_info").on('keydown keyup keypress change', function() {
        var _maxlength = 1000;
        var _titleLen = $(this).val().length;
        $('.inquiry_info_count').html(_titleLen);

        if (_titleLen > _maxlength) {
            var _input = $(this).val().substring(0, _maxlength);
            $('#inquiry_info').html(_input);
            $('.inquiry_info_count').html(_maxlength);
        }
    });

    // お問い合わせ投稿
    $("#inquiry_submit").on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        var result = inquiry_check_and_submit();
        if (!result) {
            return false;
        }

        var inquiry_info = $.trim($('#inquiry_info').val());
        var cid = $.trim($('#cid').val());
        var pid = $.trim($('#pid').val());

        $.ajax({
            type: "POST",
            url: '/api/inquiry',
            data: {
                "cid": cid,
                "pid": pid,
                "inquiry_info": inquiry_info
            },
            success: function(data) {
                if (data.code == "500") {
                    alert(data.info);
                    return false;
                } else {
                    alert(data.info);
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
