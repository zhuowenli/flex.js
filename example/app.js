/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-04-28 15:38:23
 */

'use strict';

import './app.sass';

$(() => {
    const $question = $('.question');
    const $answer = $('.answer');

    $question.delegate('.summary', 'click', function () {
        const $this = $(this);
        const $content = $this.parent();
        const content = $content.find('.content').val();

        $this.hide();
        $content.append(content);
    });

    $answer.delegate('.summary', 'click', function () {
        const $this = $(this);
        const $content = $this.parent();
        const content = $content.find('.content').val();

        $this.hide();
        $content.append(content);
    });
});
