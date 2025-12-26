/**
 * リンク更新(新規作成)
 */
function link_check_and_submit() {
    var link_info = $.trim($('#link_info').val());
    var error_msg = '';

    if (link_info === null || link_info === "" || link_info == document.getElementById('link_info').defaultValue) {
        error_msg = 'URLが入力されていません';
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

    // リンク入力欄
    $("#link_info").css('color', '#999');

    $("#link_info").focus(function() {
        if ($(this).val() == document.getElementById('link_info').defaultValue) {
            $(this).css('color', '#000').val('');
        }
    }).blur(function() {
        if (jQuery.trim($(this).val()) === "") {
            $(this).css('color', '#999').val(document.getElementById('link_info').defaultValue);
        }
    });

    // リンク投稿
    $("#link_submit").on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        var result = link_check_and_submit();
        if (!result) {
            return false;
        }

        var link_info = $.trim($('#link_info').val());
        var cid = $.trim($('#cid').val());
        var pid = $.trim($('#pid').val());

        $.ajax({
            type: "POST",
            url: '/api/link',
            data: {
                "cid": cid,
                "pid": pid,
                "link_info": link_info
            },
            success: function(data) {
                if (data.code == "500") {
                    alert(data.info);
                    return false;
                } else {
                    alert('送信しました。確認後、掲載させて頂きます。');
                    location.reload();
                    return false;
                }
            },
            error: function() {
                alert('送信に失敗しました。');
                return false;
            }
        });
    });
});
